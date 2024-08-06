import express from "express";

import { authRoutes } from "./authRoutes";
import { PricebookRouter } from "./pricebookRouter";
import { InvertorycountRouter } from './invertorycountRouter';
import {InvertorydetellRouter} from './invertorydetellRouter'
import { User } from "./userRouter";
import { OrderRouter } from "./orderRouter";
import { ProductRouter } from "./productRoutes";
import { SullierRouter } from "./supplierRouter";
import { CustomerRouter } from "./customerRouter";
import { PurchaseOderRouter } from "./purchaseOrderRouter";
import { OrderdetellRouter } from "./orderdetailRouter";
let router = express.Router();

router.use('/auth', authRoutes)
router.use('/', ProductRouter)
router.use('/', SullierRouter)
router.use('/', CustomerRouter)
router.use('/', PurchaseOderRouter)

router.use('/auth', authRoutes)
router.use('/', PricebookRouter)
router.use('/', InvertorycountRouter)
router.use('/', InvertorydetellRouter)
router.use('/', User)   
router.use('/', OrderRouter)
router.use('/', OrderdetellRouter)


export const routerSystem = router