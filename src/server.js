require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// Middlewares base
app.use(cors());
app.use(express.json());

// ===============================
// Swagger
// ===============================
const { swaggerUi, swaggerSpec } = require("./config/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===============================
// Rutas del sistema
// ===============================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

// ===============================
// Conexión a MongoDB
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado correctamente"))
  .catch((err) => console.log("Error al conectar MongoDB:", err));

// ======================================================
// EXPORTAR APP (para Jest)
// ======================================================
module.exports = app;

// ======================================================
// SOLO iniciar servidor si NO estamos en test
// ======================================================
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Servidor backend escuchando en puerto ${PORT}`)
  );
}
