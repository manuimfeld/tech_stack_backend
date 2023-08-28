import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "clave_secreta", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token inválido
    }
    req.user = user; // El usuario autenticado está disponible en req.user
    next();
  });
};

export const authorizeAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ error: "No tienes permisos" }); //403 (Prohibido)
  }
};
