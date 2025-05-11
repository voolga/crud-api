import http from "http";
import dotenv from "dotenv";
import { processUserEndpoint } from "./utils.ts/process-user-endpoint";
import { validateUUID } from "./utils.ts/id-validation";
import { invalidUUID, routeNotFound } from "./utils.ts/errors";
import { methodNotAllowed } from "./utils.ts/errors";

dotenv.config();

const PORT = process.env.DEFAULT_PORT || 4000;

const server = http.createServer((req, res) => {
  const method = req.method ?? "";
  const url = req.url ?? "";
  const parts = url.split("/").filter(Boolean);

  const isBaseUrlValid = parts[0] === "api" && parts[1] === "users";

  if (parts.length === 2 && isBaseUrlValid) {
    if (method === "GET" || method === "POST") {
      return processUserEndpoint(req, res);
    }
    return methodNotAllowed(res);
  }

  if (parts.length === 3 && isBaseUrlValid) {
    const id = parts[2];
    const isIdValid = validateUUID(id);

    if (!isIdValid) {
      return invalidUUID(res);
    }

    if (method === "GET" || method === "PUT" || method === "DELETE") {
      return processUserEndpoint(req, res, id);
    }

    return methodNotAllowed(res);
  }

  return routeNotFound(res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
