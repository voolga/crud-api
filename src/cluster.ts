import { cpus } from "os";
import { fork } from "child_process";
import http, { IncomingMessage, request } from "http";
import { pipeline } from "stream/promises";

const numCPUs = cpus().length;
const basePort = Number(process.env.DEFAULT_PORT) || 4000;
let currentWorker = 0;

for (let i = 1; i < numCPUs; i++) {
  const workerPort = basePort + i;
  forkWorker(workerPort);
}

http
  .createServer((req, res) => {
    const workerPort = basePort + ((currentWorker++ % (numCPUs - 1)) + 1);

    const proxy = request(
      {
        hostname: "localhost",
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      async (workerRes) => {
        res.writeHead(workerRes.statusCode || 500, workerRes.headers);
        try {
          await pipeline(workerRes, res);
        } catch (err) {
          console.error("Response pipeline error:", err);
          res.writeHead(500);
          res.end("Pipeline failed");
        }
      }
    );

    proxy.on("error", (err) => {
      console.error("Proxy request error:", err);
      res.writeHead(502);
      res.end("Bad Gateway");
    });

    pipeline(req as IncomingMessage, proxy).catch((err) => {
      console.error("Request pipeline error:", err);
      proxy.destroy();
      res.writeHead(500);
      res.end("Pipeline failed");
    });
  })
  .listen(basePort, () => {
    console.log(`Load balancer running on http://localhost:${basePort}`);
  });

function forkWorker(port: number) {
  const worker = fork("dist/index.js", [], {
    env: { ...process.env, DEFAULT_PORT: port.toString() },
  });

  worker.on("exit", (code) => {
    console.log(`Worker on port ${port} exited with code ${code}`);
  });
}
