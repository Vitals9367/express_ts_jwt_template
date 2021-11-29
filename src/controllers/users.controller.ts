import express from "express";
import db from "../models";

const User = db.User;

export const getAllUsers = async (req:express.Request, res:express.Response) => {

    const users = await User.findAll();
    return res.status(200).send({users});
};