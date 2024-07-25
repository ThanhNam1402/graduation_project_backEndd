


import express from "express";


import { authRoutes } from "./authRoutes";
import { PlanRouter } from "./planRouter";
let router = express.Router();

router.use('/auth', authRoutes)
router.use('/', PlanRouter)
export const routerSystem = router