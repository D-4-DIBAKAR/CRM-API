import { Organisation } from "../schemas/organisation";
import mongoose from "mongoose";

//  Create Organisation
export const createOrganisation = async (data: any) => {
    try {
        return await Organisation.create(data);
    } catch (error) {
        console.error("❌ Error creating organisation:", error);
        throw new Error("Failed to create organisation");
    }
};

//  Get All Organisations
export const getOrganisations = async () => {
    try {
        return await Organisation.find();
    } catch (error) {
        console.error("❌ Error fetching organisations:", error);
        throw new Error("Failed to fetch organisations");
    }
};

//  Get Single Organisation by ID
export const findOrganisationById = async (id: string) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Organisation.findById(id);
    } catch (error) {
        console.error("❌ Error finding organisation:", error);
        return null;
    }
};

//  Update Organisation
export const updateOrganisation = async (id: string, data: any) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Organisation.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        console.error("❌ Error updating organisation:", error);
        return null;
    }
};

//  Delete Organisation
export const deleteOrganisation = async (id: string) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Organisation.findByIdAndDelete(id);
    } catch (error) {
        console.error("❌ Error deleting organisation:", error);
        return null;
    }
};
