import express from "express";
const router = express.Router();
import { home, loginAgente, validarAgente } from "../controllers/fbiControllers.js";


router.get("/", home);
router.get("/SignIn",loginAgente)
router.get("/dashboard", validarAgente)


export default router;