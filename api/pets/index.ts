import { NowRequest, NowResponse } from "@now/node";
import { Methods, Status } from "../../utils/api.utils";
import { PetsController } from "./_pets.controller";
import { connectDB } from "../../setup/connect.db";

export default async function PetsApi(req: NowRequest, res: NowResponse) {
  await connectDB();
  if (req.method === Methods.Get) {
    PetsController.getPets(req, res);
  } else if (req.method === Methods.Post) {
    PetsController.addPet(req, res);
  } else {
    res.status(Status.BadRequest).send("Bad request");
  }
}
