import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "node:stream/consumers";

process.loadEnvFile();

const port = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

const users = [
  { id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d", name: "Miguel", age: 28 },
  { id: "f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b", name: "Mateo", age: 34 },
  { id: "9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d", name: "Pablo", age: 22 },
  { id: "3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f", name: "Lucía", age: 31 },
  { id: "7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e", name: "Ana", age: 26 },
  { id: "5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a", name: "Juan", age: 29 },
  { id: "2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d", name: "Sofía", age: 25 },
  { id: "8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c", name: "Carlos", age: 37 },
  { id: "4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f", name: "Elena", age: 23 },
  { id: "0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b", name: "Diego", age: 30 },
];

const server = createServer(async (req, res) => {
  const { method } = req;

  const url = new URL(req.url, `http://localhost:${port}`);
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  if (method === "GET") {
    if (pathname === "/health") {
      sendJson(res, 200, { status: "ok", uptime: process.uptime() });
      return;
    }

    if (pathname === "/users") {
      let result = [...users];

      const name = searchParams.get("name");
      if (name) {
        result = result.filter((user) =>
          user.name.toLowerCase().includes(name.toLowerCase()),
        );
      }

      const minAge = searchParams.get("minAge");
      if (minAge) {
        result = result.filter((user) => user.age >= Number(minAge));
      }

      const maxAge = searchParams.get("maxAge");
      if (maxAge) {
        result = result.filter((user) => user.age <= Number(maxAge));
      }

      const limit = searchParams.get("limit");
      const offset = searchParams.get("offset");
      if (limit !== null && offset !== null) {
        result = result.slice(Number(offset), Number(offset) + Number(limit));
      }

      sendJson(res, 200, result);
      return;
    }
  }

  if (method === "POST") {
    if (pathname === "/users") {
      let body;
      try {
        body = await json(req);
      } catch {
        sendJson(res, 400, { error: "invalid JSON body" });
        return;
      }

      if (!body || !body.name) {
        sendJson(res, 400, { error: "name is required" });
        return;
      }

      const newUser = {
        id: randomUUID(),
        name: body.name,
        age: body.age,
      };
      users.push(newUser);
      sendJson(res, 201, newUser);
      return;
    }
  }

  sendJson(res, 404, { error: "Ruta no encontrada" });
});

server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});
