import { Router } from "express";

const router = Router();

import { HomeController } from "@controllers";

router.get("/", HomeController.index);

export default router;
