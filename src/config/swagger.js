const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Comic-Shop API",
      version: "1.0.0",
      description: "Documentación de la API REST del proyecto Comic Shop",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor local",
      },
      {
        url: "https://comic-shop-backend.onrender.com",
        description: "Servidor en Render",
      },
    ],
  },
  apis: [
    "./src/routes/*.js" // Swagger leerá las anotaciones dentro de sus rutas
  ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
