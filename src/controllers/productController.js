const Product = require("../models/Product");

// LISTAR todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
};

// OBTENER un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
};

// CREAR producto (solo admin)
exports.createProduct = async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Solo administradores pueden crear productos" });
    }

    const nuevo = await Product.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
};

// ACTUALIZAR producto
exports.updateProduct = async (req, res) => {
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
};

// ELIMINAR producto
exports.deleteProduct = async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Solo administradores pueden eliminar productos" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};
