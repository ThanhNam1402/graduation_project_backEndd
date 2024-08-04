import express from "express";

import { authRoutes } from "./authRoutes";
import { PricebookRouter } from "./pricebookRouter";
import { InvertorycountRouter } from './invertorycountRouter';
import { User } from "./userRouter";
import { OrderRouter } from "./orderRouter";
import { ProductRouter } from "./productRoutes";
import { SullierRouter } from "./supplierRouter";
import { CustomerRouter } from "./customerRouter";
import { PurchaseOderRouter } from "./purchaseOrderRouter";
let router = express.Router();

router.use('/auth', authRoutes)
router.use('/', ProductRouter)
router.use('/', SullierRouter)
router.use('/', CustomerRouter)
router.use('/', PurchaseOderRouter)

router.use('/auth', authRoutes)
router.use('/', PricebookRouter)
router.use('/', InvertorycountRouter)
router.use('/', User)
router.use('/', OrderRouter)

export const routerSystem = router