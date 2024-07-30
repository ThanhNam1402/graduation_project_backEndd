import express from "express";
import invertorycountController from "../controllers/systemController/invertorycountController";
let router = express.Router();

router.get("/invertory", invertorycountController.getAll);
router.delete("/invertory/:id", invertorycountController.Remove);
router.put("/invertory/:id", invertorycountController.Update);
export const InvertorycountRouter = router;
