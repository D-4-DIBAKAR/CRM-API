import { User } from "../schemas/user";

export const createUser = async (data: any) => {
    return await User.create(data);
};

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
};
