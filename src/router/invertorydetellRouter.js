import express from "express";
import invertorydetellController from "../controllers/systemController/invertorydetellController";
let router = express.Router();

router.post("/invertorydetail", invertorydetellController.Create);
router.delete("/invertorydetail/:id", invertorydetellController.Remove);
export const InvertorydetellRouter = router;