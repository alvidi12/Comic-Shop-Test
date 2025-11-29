const request = require("supertest");
const { app } = require("../src/server");
const mongoose = require("mongoose");

describe("PRODUCT CRUD TESTS", () => {

  let tokenAdmin = "";
  let productoId = "";

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // LOGIN ADMIN
  test("Login admin correctamente al sitio", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin1234@admin.cl",
        password: "admin1234"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    tokenAdmin = res.body.token;
  });

  test("GET para listar productos", async () => {
    const res = await request(app).get("/api/productos");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST para crear un producto", async () => {
    const nuevo = {
      titulo: "TEST-TITULO-JEST",
      nombre: "TEST-NOMBRE-JEST",
      descripcion: "Producto de prueba Jest",
      precio: 9999,
      clasificacion: "T",
      genero: "Aventura",
      tipo: "Comic",
      estado: "OnGoing",
      artista: "Desconocido",
      autor: "Prueba Jest",
      imagen: "",
      link: ""
    };

    const res = await request(app)
      .post("/api/productos")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(nuevo);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("_id");

    productoId = res.body._id;
  });

  test("PUT para actualizar el producto creado", async () => {
    const res = await request(app)
      .put(`/api/productos/${productoId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: 7777 });

    expect(res.statusCode).toBe(200);
    expect(res.body.precio).toBe(7777);
  });

  test("DELETE para eliminar el producto creado", async () => {
    const res = await request(app)
      .delete(`/api/productos/${productoId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Producto eliminado");
  });
});
