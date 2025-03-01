import express from "express";
import { createOrganisation, getOrganisations, modifyOrganisation, removeOrganisation } from "../services/organisationService";
import { authenticate, authorizeAdmin } from "../middlewares/auth";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createOrganisation);
router.get("/", authenticate, getOrganisations);
router.put("/:id", authenticate, authorizeAdmin, modifyOrganisation);
router.delete("/:id", authenticate, authorizeAdmin, removeOrganisation);

export default router;
