import express from "express";
import { TechnologyController } from "../controllers/technologys.js";
import { authenticateToken, authorizeAdmin } from "../middlewares/jwt.js";
const router = express.Router();

router.post("/", authenticateToken, TechnologyController.postTechnology);

router.get("/", TechnologyController.getTechnologys);

router.get("/:technology", TechnologyController.getTechnology);

router.get(
  "/user/posts",
  authenticateToken,
  TechnologyController.getTechnologysByUserId
);

router.put(
  "/:id",
  authenticateToken,
  TechnologyController.putTechnologyByUserId
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  TechnologyController.deleteTechnology
);

export default router;
