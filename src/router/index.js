


import express from "express";

import { authRoutes } from "./authRoutes";
import { ProductRouter } from "./productRoutes";
let router = express.Router();

router.use('/auth', authRoutes)
router.use('/', ProductRouter)
export const routerSystem = router