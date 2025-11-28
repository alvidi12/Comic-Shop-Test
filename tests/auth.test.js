// TESTS DE AUTENTICACIÓN
const request = require("supertest");
const app = require("../src/server");
const mongoose = require("mongoose");

describe("AUTH TESTS", () => {

  // Cerrar conexión después de los tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  const userTest = {
    nombre: "Usuario Test",
    email: `test_user_${Date.now()}@example.com`,
    password: "123456"
  };


  let token = "";

  // TEST 1: Registro
  test("Debe registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userTest);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message");
  });

  // TEST 2: Login
  test("Debe hacer login y devolver un token JWT", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userTest.email,
        password: userTest.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token; // Guardamos para los demás tests
  });

});
