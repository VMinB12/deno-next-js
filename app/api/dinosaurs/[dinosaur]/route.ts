import { NextRequest } from "next/server";
import { getDatabase } from "../../db/db.ts";

type RouteParams = { params: { dinosaur: string } };

export const GET = async (_request: NextRequest, context: RouteParams) => {
  if (!context?.params?.dinosaur) {
    return Response.json("No dinosaur name provided.");
  }

  const db = await getDatabase();
  const dinosaur = await db.get(
    "SELECT * FROM dinosaurs WHERE LOWER(name) = LOWER(?)",
    context.params.dinosaur,
  );

  return Response.json(dinosaur ? dinosaur : "No dinosaur found.");
};
