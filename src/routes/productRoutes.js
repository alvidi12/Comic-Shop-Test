const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// IMPORTAR CONTROLADOR
const productController = require("../controllers/productController");
// LISTAR productos
router.get("/", productController.getAllProducts);
// OBTENER por ID
router.get("/:id", productController.getProductById);
// CREAR
router.post("/", authMiddleware, productController.createProduct);
// ACTUALIZAR
router.put("/:id", authMiddleware, productController.updateProduct);
// ELIMINAR
router.delete("/:id", authMiddleware, productController.deleteProduct);


// LISTAR todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
});

// OBTENER un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
});

// CREAR producto (solo admin)
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Solo administradores pueden crear productos" });
    }

    const nuevo = await Product.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
});

// ACTUALIZAR producto
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Solo administradores pueden editar productos" });
    }

    const actualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error: error.message });
  }
});

// ELIMINAR producto
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Solo administradores pueden eliminar productos" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints CRUD para productos
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 */

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Producto actualizado
 */

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
