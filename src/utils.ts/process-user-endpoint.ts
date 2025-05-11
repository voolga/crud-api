import { IncomingMessage, ServerResponse } from "http";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user-handlers";
import {
  methodNotAllowed,
  missingMethod,
  internalServerError,
  invalidUUID,
} from "./errors";
import { validateUUID } from "./id-validation";
export async function processUserEndpoint(
  req: IncomingMessage,
  res: ServerResponse,
  id?: string
) {
  try {
    if (id && !validateUUID(id)) {
      return invalidUUID(res);
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
    internalServerError(res);
  }
}
