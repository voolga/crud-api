import { ServerResponse } from "http";

export function sendErrorResponse(
  res: ServerResponse,
  statusCode: 400 | 404 | 405 | 500,
  message: string
) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}

export const methodNotAllowed = (
  res: ServerResponse,
  message = "Method not allowed"
) => sendErrorResponse(res, 405, message);

export const routeNotFound = (
  res: ServerResponse,
  message = "Route not found"
) => sendErrorResponse(res, 404, message);

export const notFound = (res: ServerResponse, message = "User not found") =>
  sendErrorResponse(res, 404, message);

export const badRequest = (res: ServerResponse, message = "Bad request") =>
  sendErrorResponse(res, 400, message);

export const missingMethod = (
  res: ServerResponse,
  message = "Missing HTTP method"
) => sendErrorResponse(res, 400, message);

export const internalServerError = (
  res: ServerResponse,
  message = "Internal Server Error"
) => sendErrorResponse(res, 500, message);

export const invalidUUID = (res: ServerResponse, message = "Invalid UUID") =>
  sendErrorResponse(res, 400, message);
