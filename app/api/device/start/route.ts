import { startBackgroundProcess } from "../device.ts";

export function GET() {
    const id = crypto.randomUUID();
    startBackgroundProcess(id);
    return Response.json(id);
}
