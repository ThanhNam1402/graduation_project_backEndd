import express from "express";

import CustomerController from "../controllers/systemController/customerController";

let router = express.Router();


router.get('/customers', CustomerController.getAll);

export const CustomerRouter = router