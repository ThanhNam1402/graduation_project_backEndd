import express from "express";



import SupplierController from "../controllers/systemController/supplierController";

let router = express.Router();


router.get('/suppliers', SupplierController.getAll);

export const SullierRouter = router