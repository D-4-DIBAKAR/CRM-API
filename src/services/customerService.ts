import { Request, Response } from "express";
import { 
    createCustomer as createCustRepo, 
    findCustomerById, 
    getCustomers as getCustRepo, 
    updateCustomer, 
    deleteCustomer  
} from "../repository/customerRepository";
import { CustomError } from "../utils/customError";
import { AuthRequest } from "../middlewares/auth";

// ✅ Create Customer
export const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await createCustRepo(req.body);
        res.status(201).json(customer);
    } catch (error: unknown) {
        const err = error as CustomError;
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

// ✅ Get All Customers
export const getCustomers = async (_req: Request, res: Response) => {
    try {
        const customers = await getCustRepo();
        res.json(customers);
    } catch (error: unknown) {
        const err = error as CustomError;
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

// ✅ Update Customer (Admin Only)
export const modifyCustomer = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            throw new CustomError("Forbidden: Only admins can update customers", 403);
        }

        const { id } = req.params;
        if (!id) {
            throw new CustomError("Customer ID is required", 400);
        }

        // ✅ Check if Customer Exists Before Updating
        const customer = await findCustomerById(id);
        if (!customer) {
            throw new CustomError("Customer not found", 404);
        }

        const updatedCustomer = await updateCustomer(id, req.body);
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: (error as CustomError).message || "Internal Server Error" });
    }
};

// ✅ Delete Customer (Admin Only)
export const removeCustomer = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            throw new CustomError("Forbidden: Only admins can delete customers", 403);
        }

        const { id } = req.params;
        if (!id) {
            throw new CustomError("Customer ID is required", 400);
        }

        // ✅ Check if Customer Exists Before Deleting
        const customer = await findCustomerById(id);
        if (!customer) {
            throw new CustomError("Customer not found", 404);
        }

        await deleteCustomer(id);
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as CustomError).message || "Internal Server Error" });
    }
};
