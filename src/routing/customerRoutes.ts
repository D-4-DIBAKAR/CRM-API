import express from "express";
import { 
    createCustomer, 
    getCustomers, 
    modifyCustomer, 
    removeCustomer  
} from "../services/customerService";
import { authenticate, authorizeAdmin } from "../middlewares/auth";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createCustomer);
router.get("/", authenticate, getCustomers);
router.put("/:id", authenticate, authorizeAdmin, modifyCustomer);
router.delete("/:id", authenticate, authorizeAdmin, removeCustomer);  

export default router;
