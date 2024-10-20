import { getDatabase } from "../db/db.ts";

// Define the GET function
export async function GET() {
  try {
    const db = await getDatabase();
    const rows = await db.all("SELECT * FROM dinosaurs");
    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
