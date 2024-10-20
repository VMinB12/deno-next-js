import data from "../dinosaurs/data.json" with { type: "json" };
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

// Singleton instance of the database
let dbPromise: Promise<Database> | null = null;

async function initializeDatabase(): Promise<Database> {
    const db = await open({
        filename: "test.db",
        driver: sqlite3.Database,
    });

    // Create Dinosaur table and insert data
    await db.exec("DROP TABLE IF EXISTS dinosaurs");
    await db.exec(
        "CREATE TABLE IF NOT EXISTS dinosaurs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)",
    );
    const insertStmt = await db.prepare(
        "INSERT INTO dinosaurs (name, description) VALUES (?, ?)",
    );
    for (const dinosaur of data) {
        await insertStmt.run(dinosaur.name, dinosaur.description);
    }
    await insertStmt.finalize();

    // Create Device table
    await db.exec("DROP TABLE IF EXISTS devices");
    await db.exec(
        "CREATE TABLE IF NOT EXISTS devices (id INTEGER PRIMARY KEY AUTOINCREMENT, process_id INTEGER, running BOOLEAN)",
    );

    // Create Timeseries table
    await db.exec("DROP TABLE IF EXISTS timeseries");
    await db.exec(
        "CREATE TABLE IF NOT EXISTS timeseries (id INTEGER PRIMARY KEY AUTOINCREMENT, device_id INTEGER, timestamp INTEGER, temperature REAL)",
    );

    return db;
}

export function getDatabase(): Promise<Database> {
    if (!dbPromise) {
        console.log("Creating a new database connection");
        dbPromise = initializeDatabase();
    }
    return dbPromise;
}
