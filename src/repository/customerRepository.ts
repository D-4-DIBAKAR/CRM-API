import { Customer } from "../schemas/customer";
import mongoose from "mongoose";

// ✅ Create Customer
export const createCustomer = async (data: any) => {
    return await Customer.create(data);
};

// ✅ Get All Customers with Organisation Details
export const getCustomers = async () => {
    return await Customer.find().populate("organisationId");
};

// ✅ Find Customer by ID
export const findCustomerById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Customer.findById(id);
};

// ✅ Update Customer
export const updateCustomer = async (id: string, data: any) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Customer.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Delete Customer
export const deleteCustomer = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Customer.findByIdAndDelete(id);
};
