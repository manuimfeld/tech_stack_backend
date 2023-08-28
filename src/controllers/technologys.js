import { pool } from "../db/connect.js";

export const TechnologyController = {
  postTechnology: async (req, res) => {
    const {
      technology,
      description,
      difficulty,
      type,
      creation_date,
      official_website,
      img_URL,
    } = req.body;
    const creator_user_id = req.user.id;

    try {
      const result = await pool.query(
        `INSERT INTO technologys (technology, description, difficulty, type, creation_date, official_website, img_URL, creator_user_id) VALUES ('${technology}', '${description}', '${difficulty}', '${type}', '${creation_date}', '${official_website}', '${img_URL}', '${creator_user_id}')`
      );
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  getTechnologys: async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM technologys`);
      res.json(result[0]);
    } catch (err) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  getTechnology: async (req, res) => {
    const { technology } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM technologys WHERE technology = '${technology}'`
      );
      if (result[0].length === 0) return res.sendStatus(404);
      res.json(result[0]);
    } catch (err) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  getTechnologysByUserId: async (req, res) => {
    const { id } = req.user;
    try {
      const result = await pool.query(
        `SELECT * FROM technologys WHERE creator_user_id = ${id}`
      );
      if (!result)
        res.status(404).json({ error: "No has subido ninguna tecnología" });
      res.json(result[0]);
    } catch (err) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putTechnologyByUserId: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedFields = req.body;
    try {
      const techPost = await pool.query(
        `SELECT * FROM technologys WHERE id = ?`,
        [id]
      );
      if (techPost[0].length === 0) {
        res.status(404).json({ error: "Tecnología no encontrada" });
        return;
      }

      if (techPost[0][0].creator_user_id !== userId) {
        res.status(500).json({ error: "No puedes editar esta tecnología" });
        return;
      }

      //Actualizar tecnología
      const updateColumns = [];
      const updateValues = [];

      for (const property in updatedFields) {
        updateColumns.push(`${property} = ?`);
        updateValues.push(updatedFields[property]);
      }
      updateValues.push(userId, id);

      let updateQuery = `UPDATE technologys SET ${updateColumns.join(
        ", "
      )} WHERE creator_user_id = ? AND id = ?`;

      await pool.query(updateQuery, [...updateValues]);
      res.status(200).json({ mensaje: "Tecnología actualizada exitosamente" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "en el servidor" });
    }
  },
  deleteTechnology: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `DELETE FROM technologys WHERE id = ${id}`
      );
      if (!result)
        res.status(404).json({ error: "No se ha encontrado la publicación" });
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
