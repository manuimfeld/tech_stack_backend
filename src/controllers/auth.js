import jwt from "jsonwebtoken";
import { pool } from "../db/connect.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.js";

export const AuthController = {
  postRegister: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    try {
      const hashedPassword = await hashPassword(password, 10);

      const result = await pool.query(
        `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  postLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query(
        `SELECT id, username, role, password FROM users WHERE email = '${email}'`
      );

      if (result.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const user = result[0][0];
      const compared = await comparePassword(password, user.password);

      if (!compared) {
        return res.status(401).json({ error: "La contraseña es incorrecta" });
      }

      // Si la contraseña es correcta, puedes enviar información del usuario (excepto la contraseña) como respuesta
      user.password = undefined;
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        "clave_secreta"
      );
      res.json({
        message: "Inicio de sesión exitoso",
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
