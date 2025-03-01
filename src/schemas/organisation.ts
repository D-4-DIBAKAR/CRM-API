import mongoose, { Schema, Document } from "mongoose";

export interface IOrganisation extends Document {
    name: string;
    address: string;
}

const OrganisationSchema = new Schema<IOrganisation>({
    name: { type: String, required: true },
    address: { type: String, required: true }
});

export const Organisation = mongoose.model<IOrganisation>("Organisation", OrganisationSchema);
