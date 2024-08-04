import express from "express";

import PurchaseOrderController from "../controllers/systemController/purchaseOrderController";

let router = express.Router();
router.get('/purchaseorders', PurchaseOrderController.getAll);
router.get('/purchaseorders/detail/:id', PurchaseOrderController.handleGetDetail);

export const PurchaseOderRouter = router