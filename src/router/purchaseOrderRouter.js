import express from "express";

import PurchaseOrderController from "../controllers/systemController/purchaseOrderController";

let router = express.Router();
router.get('/purchaseorders', PurchaseOrderController.getAll);
router.get('/purchaseorders/detail/:id', PurchaseOrderController.handleGetDetail);
router.post('/purchaseorders/new', PurchaseOrderController.AddPurChaseOrder);


router.get('/purchaseorders/autocomplete', PurchaseOrderController.getConpleteProduct);

export const PurchaseOderRouter = router