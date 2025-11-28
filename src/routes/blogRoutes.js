const express = require('express');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Listar blogs (para `Blog.js`)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener blogs', error: error.message });
  }
});

// Detalle de blog (para `BlogDetalle.js`)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog no encontrado' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el blog', error: error.message });
  }
});

// Crear blog (admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'Solo administradores pueden crear blogs' });
    }

    const nuevo = await Blog.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear blog', error: error.message });
  }
});

// Actualizar blog
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'Solo administradores pueden editar blogs' });
    }

    const actualizado = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar blog', error: error.message });
  }
});

// Eliminar blog
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'Solo administradores pueden eliminar blogs' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar blog', error: error.message });
  }
});

module.exports = router;
