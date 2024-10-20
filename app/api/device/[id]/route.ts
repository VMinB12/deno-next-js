import { getDatabase } from "../../db/db.ts";
import { NextRequest } from "next/server";

type RouteParams = { params: { id: number } };

export const GET = async (_request: NextRequest, context: RouteParams) => {
    try {
        const db = await getDatabase();
        const rows = await db.all(
            "SELECT * FROM timeseries WHERE device_id = ?",
            [
                context.params.id,
            ],
        );
        return new Response(JSON.stringify(rows), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error querying the database:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
};
