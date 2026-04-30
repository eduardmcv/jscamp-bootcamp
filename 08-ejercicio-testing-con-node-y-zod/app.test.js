import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import http from "node:http";
import app from "./app.js";

const TEST_PORT = 5678;
const BASE_URL = `http://localhost:${TEST_PORT}`;

let server;

before(async () => {
  process.env.NODE_ENV = "test";
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(TEST_PORT, resolve));
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  await new Promise((resolve) => setTimeout(resolve, 500));
  process.exit(0);
});

async function request(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  let json = null;
  const text = await res.text();
  try {
    json = JSON.parse(text);
  } catch {}

  return { status: res.status, json };
}

// ─── GET /jobs ────────────────────────────────────────────────────────────────

describe("GET /jobs", () => {
  it("debe responder con 200 y un array de trabajos", async () => {
    const { status, json } = await request("GET", "/jobs");
    assert.strictEqual(status, 200);
    assert.ok(Array.isArray(json.data));
  });

  it("debe filtrar trabajos por tecnología", async () => {
    const { json } = await request("GET", "/jobs?technology=react");
    assert.ok(json.data.every((job) => job.data.technology.includes("react")));
  });

  it("debe respetar el límite de resultados", async () => {
    const { json } = await request("GET", "/jobs?limit=2");
    assert.strictEqual(json.limit, 2);
    assert.strictEqual(json.data.length, 2);
  });

  it("debe aplicar offset correctamente", async () => {
    const { json } = await request("GET", "/jobs?offset=1");
    assert.strictEqual(json.data[0].id, "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57");
  });
});

// ─── GET /jobs/:id ────────────────────────────────────────────────────────────

describe("GET /jobs/:id", () => {
  it("debe devolver el trabajo con ID especificado", async () => {
    const id = "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57";
    const { status, json } = await request("GET", `/jobs/${id}`);
    assert.strictEqual(status, 200);
    assert.strictEqual(json.id, id);
  });

  it("debe devolver 404 cuando el ID no existe", async () => {
    const { status, json } = await request("GET", "/jobs/id-que-no-existe");
    assert.strictEqual(status, 404);
    assert.ok(json.error);
  });
});

// ─── POST /jobs ───────────────────────────────────────────────────────────────

const jobValido = {
  titulo: "Desarrollador Frontend",
  empresa: "Mi Empresa",
  ubicacion: "Remoto",
  descripcion: "Descripción del puesto",
  data: {
    technology: ["react", "javascript"],
    modalidad: "remoto",
    nivel: "senior",
  },
};

describe("POST /jobs", () => {
  it("debe crear un job válido y devolver 201", async () => {
    const { status, json } = await request("POST", "/jobs", jobValido);
    assert.strictEqual(status, 201);
    assert.ok(json.id);
    assert.strictEqual(json.titulo, jobValido.titulo);
    assert.strictEqual(json.empresa, jobValido.empresa);
  });

  it("debe devolver 400 si el titulo tiene menos de 3 caracteres", async () => {
    const { status } = await request("POST", "/jobs", {
      ...jobValido,
      titulo: "AB",
    });
    assert.strictEqual(status, 400);
  });

  it("debe devolver 400 si el titulo tiene más de 100 caracteres", async () => {
    const { status } = await request("POST", "/jobs", {
      ...jobValido,
      titulo: "A".repeat(101),
    });
    assert.strictEqual(status, 400);
  });

  it("debe devolver 400 si falta el campo titulo", async () => {
    const { titulo, ...sinTitulo } = jobValido;
    const { status } = await request("POST", "/jobs", sinTitulo);
    assert.strictEqual(status, 400);
  });

  it("debe devolver 400 si titulo no es un string", async () => {
    const { status } = await request("POST", "/jobs", {
      ...jobValido,
      titulo: 123,
    });
    assert.strictEqual(status, 400);
  });

  it("debe devolver 201 aunque falte descripcion (es opcional)", async () => {
    const { descripcion, ...sinDescripcion } = jobValido;
    const { status } = await request("POST", "/jobs", sinDescripcion);
    assert.strictEqual(status, 201);
  });
});

// ─── PUT /jobs/:id ────────────────────────────────────────────────────────────

describe("PUT /jobs/:id", () => {
  it("debe actualizar el job completo y devolver 204", async () => {
    const id = "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57";
    const { status } = await request("PUT", `/jobs/${id}`, {
      ...jobValido,
      titulo: "Título Actualizado PUT",
    });
    assert.strictEqual(status, 204);

    const { json } = await request("GET", `/jobs/${id}`);
    assert.strictEqual(json.titulo, "Título Actualizado PUT");
  });

  it("debe devolver 404 cuando el ID no existe", async () => {
    const { status } = await request("PUT", "/jobs/id-inexistente", jobValido);
    assert.strictEqual(status, 404);
  });
});

// ─── PATCH /jobs/:id ──────────────────────────────────────────────────────────

describe("PATCH /jobs/:id", () => {
  it("debe actualizar solo los campos enviados y devolver 204", async () => {
    const id = "f62d8a34-923a-4ac2-9b0b-14e0ac2f5405";
    const { status } = await request("PATCH", `/jobs/${id}`, {
      titulo: "Título Parcheado",
      ubicacion: "Barcelona",
    });
    assert.strictEqual(status, 204);

    const { json } = await request("GET", `/jobs/${id}`);
    assert.strictEqual(json.titulo, "Título Parcheado");
    assert.strictEqual(json.ubicacion, "Barcelona");
  });

  it("debe devolver 404 cuando el ID no existe", async () => {
    const { status } = await request("PATCH", "/jobs/id-inexistente", {
      titulo: "Test",
    });
    assert.strictEqual(status, 404);
  });
});

// ─── DELETE /jobs/:id ─────────────────────────────────────────────────────────

describe("DELETE /jobs/:id", () => {
  it("debe eliminar el job y devolver 204", async () => {
    const id = "f62d8a34-923a-4ac2-9b0b-14e0ac2f5405";
    const { status } = await request("DELETE", `/jobs/${id}`);
    assert.strictEqual(status, 204);

    const { status: statusGet } = await request("GET", `/jobs/${id}`);
    assert.strictEqual(statusGet, 404);
  });

  it("debe devolver 404 cuando el ID no existe", async () => {
    const { status } = await request("DELETE", "/jobs/id-inexistente");
    assert.strictEqual(status, 404);
  });
});
