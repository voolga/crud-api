import { ServerResponse } from "http";

export function sendErrorResponse(
  res: ServerResponse,
  statusCode: 400 | 404 | 405 | 500,
  message: string
) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}
