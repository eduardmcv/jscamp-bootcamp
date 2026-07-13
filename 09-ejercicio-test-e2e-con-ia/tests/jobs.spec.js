// @ts-check
import { test, expect } from "@playwright/test";
import assert from "node:assert";

test("la página principal carga y muestra un buscador", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  // En vez de buscar por placeholder, podemos agregar un `aria-label` al input y buscar por:
  // page.getByLabel("Buscar trabajos, empresas o habilidades")
  // O también por getByRole
  // page.getByRole("searchbox", { name: "Buscar trabajos, empresas o habilidades" })
  const buscador = page.getByPlaceholder(
    "Buscar trabajos, empresas o habilidades",
  );
  await expect(buscador).toBeVisible();
});

test("el usuario puede buscar empleos por tecnología", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  await page.waitForSelector(".jobs-search");

  const buscador = page.getByRole("searchbox");
  // Una buena practica es usar regex, para no tener problemas de mayúsculas ni minúsculas
  // await buscador.fill(/React/i);
  await buscador.fill("React");

  const resultados = page.locator(".jobs-grid > *");
  await expect(resultados.first()).toBeVisible();
});

test("flujo completo: buscar, ver detalle, login y aplicar", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/search");
  // No hace falta esperar por el selector
  // await page.waitForSelector(".jobs-search");

  // 1. Buscar empleos con "JavaScript"
  // Podemos replicar la obsrvación del test anterior
  const buscador = page.getByRole("searchbox");
  await buscador.fill("JavaScript");

  // 2. Hacer clic en el primer resultado
  // Podemos buscar por `getByRole` el article y luego encontrar el link desde ahí para darle click.
  const firstJob = page.getByRole("article").filter({
    hasText: /JavaScript/i,
  }).first();

  await firstJob.getByRole("link").first().click();
  // await page.locator(".jobs-grid > *").first().click();

  // 3. Verificar que se muestra el detalle del empleo
  // Podemos usar `heading` para obtener el elemento:
  await expect(page.getByRole("heading", { level: 1 }).last()).toBeVisible(); // <- level 1 es por ser un h1
  // await expect(page.locator("h1").last()).toBeVisible();

  // 4. Hacer clic en "Iniciar sesión"
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  // 5. Hacer clic en "Aplicar"
  await page.getByRole("button", { name: "Aplicar a esta oferta" }).click();

  // 6. Verificar que el botón cambia a "Aplicado"
  await expect(page.getByRole("button", { name: "Aplicado" })).toBeVisible();
});

test("filtrar por ubicación muestra solo trabajos remotos", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/search");
  await page.waitForSelector(".jobs-search");

  // Podemos agregar un aria-label en los select para identificarlos mejor
  // await page.getByRole("combobox", { name: "Ubicación" }).selectOption("remoto");
  await page.getByRole("combobox").nth(1).selectOption("remoto");

  // No hace falta un timeout
  await page.waitForTimeout(400);

  // Podemos obtener el resultado como lo hicimos en el test anterior, así no usamos selectores de clases
  const cards = page.locator(".jobs-grid > *");
  await expect(cards.first()).toBeVisible();

  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i)).toContainText("Remoto");
  }
});

test("filtrar por nivel senior no muestra resultados si no hay datos de nivel", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/search");
  await page.waitForSelector(".jobs-search");

  // En este test podemos aplicar lo mismo que el anterior
  await page.getByRole("combobox").nth(2).selectOption("senior");

  await page.waitForTimeout(400);

  await expect(page.getByText("No se han encontrado empleos")).toBeVisible();
});

test("aparece paginación cuando hay más resultados de los que caben", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/search");
  await page.waitForSelector(".jobs-search");

  // Sin filtros debería haber más de 5 resultados
  const paginacion = page.getByRole("navigation", {
    name: "Paginación de resultados",
  });
  await expect(paginacion).toBeVisible();
});

test("navegar a la siguiente página cambia los resultados", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/search");
  await page.waitForSelector(".jobs-search");

  // Guardar el texto del primer resultado en página 1
  const primerCard = page.locator(".jobs-grid > *").first();
  await expect(primerCard).toBeVisible();
  const textoPagina1 = await primerCard.textContent();

  // Ir a la página siguiente
  await page
    .getByRole("button", {
      name: "Ir a la página siguiente de los resultados de búsqueda",
    })
    .click();
  await page.waitForTimeout(300);

  // Verificar que el primer resultado es diferente
  const primerCardPagina2 = page.locator(".jobs-grid > *").first();
  await expect(primerCardPagina2).toBeVisible();
  const textoPagina2 = await primerCardPagina2.textContent();

  assert.notStrictEqual(textoPagina1, textoPagina2);
});

test("se muestra el detalle de un empleo y se puede aplicar", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/search");
  await page.waitForSelector(".jobs-search");

  // Hacer clic en el primer resultado
  await page.locator(".jobs-grid > *").first().click();

  // Verificar que se muestra el detalle
  await expect(page.locator("h1").last()).toBeVisible();

  // Iniciar sesión para poder aplicar
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  // Verificar que aparece el botón Aplicar
  const botonAplicar = page.getByRole("button", {
    name: "Aplicar a esta oferta",
  });
  await expect(botonAplicar).toBeVisible();

  // Aplicar
  await botonAplicar.click();

  // Verificar que cambia a "Aplicado"
  await expect(page.getByRole("button", { name: "Aplicado" })).toBeVisible();
});
