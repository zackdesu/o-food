import { Router } from "express";
import { foodCreate, foodDelete, foodList } from "../controller/food";

export const router = Router();

router.route("/food").post(foodCreate).get(foodList);
router.delete("/food/delete/:id", foodDelete);
