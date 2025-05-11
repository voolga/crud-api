import { IncomingMessage, ServerResponse } from "http";
import users, { saveUsers } from "../data/db";
import { IUser } from "../types";
import { v4 as uuidv4 } from "uuid";
import { validateUUID } from "./id-validation";
import { getRequestBody } from "./get-request-body";
import { notFound, badRequest } from "./errors";

export async function getAllUsers(res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
}

export async function getUserById(id: string, res: ServerResponse) {
  if (!validateUUID(id)) return badRequest(res, "Invalid UUID");
  const user = users.find((u: IUser) => u.id === id);
  if (!user) return notFound(res);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  const body = await getRequestBody(req);
  const { username, age, hobbies } = body;
  if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
    return badRequest(res, "Missing or invalid fields");
  }
  const newUser: IUser = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  saveUsers();
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newUser));
}

export async function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  if (!validateUUID(id)) return badRequest(res, "Invalid UUID");
  const index = users.findIndex((u: IUser) => u.id === id);
  if (index === -1) return notFound(res);
  const body = await getRequestBody(req);
  const { username, age, hobbies } = body;
  if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
    return badRequest(res, "Missing or invalid fields");
  }
  const updatedUser: IUser = { id, username, age, hobbies };
  users[index] = updatedUser;
  saveUsers();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(updatedUser));
}

export async function deleteUser(id: string, res: ServerResponse) {
  if (!validateUUID(id)) return badRequest(res, "Invalid UUID");
  const index = users.findIndex((u: IUser) => u.id === id);
  if (index === -1) return notFound(res);
  users.splice(index, 1);
  saveUsers();
  res.writeHead(204);
  res.end();
}
