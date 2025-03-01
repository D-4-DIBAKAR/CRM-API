import express from "express";
import connectDB from "./db/connection";
import organisationRoutes from "./routing/organisationRoutes";
import customerRoutes from "./routing/customerRoutes";
import userRoutes from "./routing/userRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/organisations", organisationRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/users", userRoutes);

connectDB();

export default app;
