import express from "express";
import db from "../models";

const User = db.User;

const emailExists = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

    const email = req.body.email;

    const user = await User.findOne({ where: { email }});

    if(user != null){
        req.userExists = true;
        return next();
    }
    req.userExists = false;
    return next();
};

export default emailExists;