import { Request, Response } from "express";
import {
    createOrganisation as createOrgRepo, getOrganisations as getOrgRepo, updateOrganisation, deleteOrganisation 
        , findOrganisationById
} from "../repository/organisationRepository";

import { AuthRequest } from "../middlewares/auth";
import { CustomError } from "../utils/customError";

// ✅ Create Organisation (Admin Only)
export const createOrganisation = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            throw new CustomError("Forbidden: Only admins can create organisations", 403);
        }
        const organisation = await createOrgRepo(req.body);
        res.status(201).json(organisation);
    } catch (error: unknown) {
        res.status(500).json({ error: (error as CustomError).message || "Internal Server Error" });
    }
};

// ✅ Get All Organisations (Any Authenticated User)
export const getOrganisations = async (_req: Request, res: Response) => {
    try {
        const organisations = await getOrgRepo();
        res.json(organisations);
    } catch (error) {
        res.status(500).json({ error: (error as CustomError).message || "Internal Server Error" });
    }
};

// ✅ Update Organisation (Admin Only)
export const modifyOrganisation = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            throw new CustomError("Forbidden: Only admins can update organisations", 403);
        }
        const updatedOrganisation = await updateOrganisation(req.params.id, req.body);
        res.json(updatedOrganisation);
    } catch (error) {
        res.status(500).json({ error: (error as CustomError).message || "Internal Server Error" });
    }
};

// ✅ Delete Organisation (Admin Only)
export const removeOrganisation = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        if (!req.user || req.user.role !== "admin") {
            throw new CustomError("Forbidden: Only admins can delete organisations", 403);
        }

        if (!id) {
            throw new CustomError("Organisation ID is required", 400);
        }

        // ✅ Check if Organisation Exists Before Deleting
        const organisation = await findOrganisationById(id);
        if (!organisation) {
            throw new CustomError("Organisation not found", 404);
        }

        await deleteOrganisation(id);

        res.status(200).json({ message: "Organisation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as CustomError).message || "Internal Server Error" });
    }
};
