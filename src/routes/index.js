import { Router } from "express";
import productRouter  from "./products/index.js";

const router = Router();

router.use(productRouter);

export default router;