import { getDatabase } from "../db/db.ts";

const timerMap = new Map<string, number>();

export async function startBackgroundProcess(id: string) {
    const db = await getDatabase();
    const processId = setInterval(async () => {
        console.log("Inserting random data for device: " + id);
        await db.run(
            "INSERT INTO timeseries (device_id, timestamp, temperature) VALUES (?, ?, ?)",
            [
                id,
                Date.now(),
                Math.random() * 100,
            ],
        );
    }, 1000);
    timerMap.set(id, processId);
    await db.run(
        "INSERT INTO devices (id, running) VALUES (?, ?)",
        [
            id,
            true,
        ],
    );
}

export async function stopBackgroundProcess(id: string) {
    const timer = timerMap.get(id);
    if (timer) {
        const db = await getDatabase();
        clearInterval(timer);
        await db.run(
            "UPDATE devices SET running = ? WHERE id = ?",
            [
                false,
                id,
            ],
        );
        return new Response(`Stopped background process for device: ${id}`, {
            status: 200,
        });
    } else {
        return new Response(`No background process found for device: ${id}`, {
            status: 404,
        });
    }
}
