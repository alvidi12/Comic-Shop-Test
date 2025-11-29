// CONFIGURACIÓN BASE
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


// INICIALIZAR APP
const app = express();

app.use(cors());
app.use(express.json());

// SWAGGER
const { swaggerUi, swaggerSpec } = require("./config/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// RUTAS DE LA API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

// CONEXIÓN A MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado correctamente"))
  .catch((err) => console.log("Error al conectar MongoDB:", err));


// SERVIDOR PARA APP Y TEST
let server = null;

// SOLO iniciar servidor si NO estamos en pruebas
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  server = app.listen(PORT, () =>
    console.log(`Servidor backend escuchando en puerto ${PORT}`)
  );
}

// EXPORTACIÓN CORRECTA
module.exports = { app, server };
