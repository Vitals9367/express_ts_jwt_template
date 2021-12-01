import db from "../models";

const User = db.User;

export const getAllUsers = async () => {
    const users = await User.findAll(); 
    return users;
}