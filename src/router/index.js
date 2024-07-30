import express from "express";

import { authRoutes } from "./authRoutes";
import {PricebookRouter} from "./pricebookRouter";
import {InvertorycountRouter} from './invertorycountRouter';
import { User } from "./userRouter";
import { OrderRouter } from "./orderRouter";
let router = express.Router();

router.use('/auth', authRoutes)
router.use('/', PricebookRouter)
router.use('/', InvertorycountRouter)
router.use('/', User)
router.use('/', OrderRouter)

export const routerSystem = router