const request = require("supertest");
const { app } = require("../src/server");
const mongoose = require("mongoose");

describe("AUTH TESTS", () => {
  const userTest = {
    nombre: "Test Jest",
    email: "jest@test.com",
    password: "123456"
  };

  afterAll(async () => {
    await mongoose.connection.close();
  });


  //  test de login inválido
  test("login con contraseña incorrecta", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userTest.email,
        password: "contraseñaIncorrecta"
      });

    expect([400, 401]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message");
  });

  //   Login correcto y devuelve token JWT.
  // ============================================================
  test("login y devolver un token JWT al iniciar correctamente", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userTest.email,
        password: userTest.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
