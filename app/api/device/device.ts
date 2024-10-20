import { getDatabase } from "../db/db.ts";

export const devices = new Map<number, number>();

export function startBackgroundProcess(id: number) {
    const intervalId = setInterval(async () => {
        const db = await getDatabase();
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
    devices.set(id, intervalId);
}

export function stopBackgroundProcess(id: number) {
    const intervalId = devices.get(id);

    console.log(devices);

    if (intervalId) {
        clearInterval(intervalId);
        devices.delete(id);
        return new Response(`Stopped background process for device: ${id}`, {
            status: 200,
        });
    } else {
        return new Response(`No background process found for device: ${id}`, {
            status: 404,
        });
    }
}
