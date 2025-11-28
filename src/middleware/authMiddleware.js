const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado: token faltante' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id === "ADMIN_LOCAL") {
      req.user = {
        id: "ADMIN_LOCAL",
        email: decoded.email,
        rol: "admin"
      };
      return next();
    }

    req.user = decoded; // { id, email, rol }
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
