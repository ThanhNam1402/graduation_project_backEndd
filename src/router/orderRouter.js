import express from "express";
import ordercountController from "../controllers/systemController/orderController";
let router = express.Router();
import { checkTokenJWT } from "../middelware/jwt"


router.get("/order", checkTokenJWT, ordercountController.GetAll);
router.get("/order/code", ordercountController.GetCode);
router.post("/order", ordercountController.Create);
router.delete("/order/:id", ordercountController.Remove);
router.put("/order/:id", ordercountController.UpdateStatus);

export const OrderRouter = router;