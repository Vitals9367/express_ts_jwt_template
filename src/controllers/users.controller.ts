import express from "express";
import { getAllUsers } from "../services/userService";


export const getAll = async (req:express.Request, res:express.Response) => {

    const users = getAllUsers();
    return res.status(200).send({users});
};