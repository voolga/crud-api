import { IncomingMessage, ServerResponse } from "http";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user-handlers";
import {
  sendErrorResponse,
} from "./utils/errors";
import { validateUUID } from "./utils/id-validation";
export async function processUserEndpoint(
  req: IncomingMessage,
  res: ServerResponse,
  id?: string
) {
  try {
    if (id && !validateUUID(id)) {
      return sendErrorResponse(res, 400, "Invalid UUID");
    }

    switch (req.method) {
      case "GET":
        return id ? await getUserById(id, res) : await getAllUsers(res);

      case "POST":
        return await createUser(req, res);

      case "PUT":
        return await updateUser(req, res, id!);

      case "DELETE":
        return await deleteUser(id!, res);
    }
  } catch (err) {
    sendErrorResponse(res, 500, "Internal Server Error");
  }
}
