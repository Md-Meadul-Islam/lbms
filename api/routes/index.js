import { Router } from "express";

import authRoutes from "./auth.routes.js";

import apiRoutes from "./api.routes.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| API Version 1
|--------------------------------------------------------------------------
*/

router.use("/v1", authRoutes);

router.use("/v1", apiRoutes);

export default router;