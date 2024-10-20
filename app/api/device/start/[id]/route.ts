import { NextRequest } from "next/server";
import { startBackgroundProcess } from "../../device.ts";

type RouteParams = { params: { id: number } };

export const GET = (_request: NextRequest, context: RouteParams) => {
    if (!context?.params?.id) {
        return Response.json("No id provided.");
    }

    startBackgroundProcess(context.params.id);

    return Response.json("Started device with id: " + context.params.id);
};
