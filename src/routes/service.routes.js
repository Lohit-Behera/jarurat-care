import { Router } from "express";
import { createService, getServices, updateService, deleteService } from "../controllers/serviceController.js";

const router = Router();

router.post("/create", createService)

router.get("/get/all", getServices)

router.patch("/update/:serviceId", updateService)

router.delete("/delete/:serviceId", deleteService)

export default router