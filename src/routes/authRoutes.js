const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      nombre,
      email,
      password: passwordHash,
      rol: 'user'
    });

    res.status(201).json({ 
      message: 'Usuario registrado correctamente',
      userId: user._id 
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
});


// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ADMIN LOCAL
    if (email === "admin1234@admin.cl" && password === "admin1234") {
      const token = jwt.sign(
        { id: "ADMIN_LOCAL", email, rol: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.json({
        message: "Login correcto (Administrador Local)",
        token,
        user: {
          id: "ADMIN_LOCAL",
          nombre: "Administrador",
          email,
          rol: "admin"
        }
      });
    }

    // LOGIN NORMAL
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const esValido = await bcrypt.compare(password, user.password);
    if (!esValido) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user._id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login correcto',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
});


// **VALIDAR TOKEN (LO ÚNICO QUE SE AGREGA)**
router.get("/validate", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Token válido",
    user: req.user
  });
});

module.exports = router;
