import { NextRequest } from "next/server";
import { stopBackgroundProcess } from "../../device.ts";

type RouteParams = { params: { id: string } };

export const GET = (_request: NextRequest, context: RouteParams) => {
    if (!context?.params?.id) {
        return new Response("No id provided.", { status: 400 });
    }

    const id = context.params.id;

    return stopBackgroundProcess(id);
};
