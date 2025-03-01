import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
    name: string;
    email: string;
    phone: string;
    organisationId: mongoose.Types.ObjectId;
}

const CustomerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    organisationId: { type: Schema.Types.ObjectId, ref: "Organisation", required: true }
});

export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
