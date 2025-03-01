import mongoose, { Schema, Document } from "mongoose";
import { hashPassword, comparePassword } from "../utils/password";

export interface IUser extends Document {
    name: string;
    email: string;
    mobile: string;
    dob: Date;
    password: string;
    role: "admin" | "user";
    type: "vendor" | "organisation";
    customerOrg?: mongoose.Types.ObjectId;
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    type: { type: String, enum: ["vendor", "organisation"], required: true },
    customerOrg: { type: Schema.Types.ObjectId, ref: "Organisation", required: function () { return this.type === "vendor"; } }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
});

// Compare Password
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return comparePassword(password, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
