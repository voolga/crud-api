import { ServerResponse } from "http";

export function methodNotAllowed(res: ServerResponse) {
  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Method not allowed" }));
}

export function routeNotFound(res: ServerResponse) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

export function notFound(res: ServerResponse, message = "User not found") {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}

export function badRequest(res: ServerResponse, message = "Bad request") {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}

export function missingMethod(res: ServerResponse, message = "Missing HTTP method") {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}

export function internalServerError(res: ServerResponse, message = "Internal Server Error") {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}

export function invalidUUID(res: ServerResponse, message = "Invalid UUID") {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}
