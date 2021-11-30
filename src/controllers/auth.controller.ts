import db from "../models";
import config from "../config/auth.config";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import fieldsMissing from '../utils/fieldHelpers';
import express from "express";

const User = db.User;

//const Op = db.Sequelize.Op;

export const signup = async (req:express.Request, res:express.Response) => {

  const fields = ['name','email','password'];

  const missingField = fieldsMissing(fields,req.body);

  if(req.userExists){
    return res.status(403).send({ message: `Email already exists!` });
  }

  if(missingField){
    return res.status(403).send({ message: `${missingField} field is missing!` });
  }

  try {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      })
      return res.status(202).send({ message: "User was registered successfully!" });
      
  }catch (error){
    return res.status(500).send({ message: "Server Error: " + error})
  }
};

export const signin = async (req:express.Request, res:express.Response) => {

  const fields = ['email','password'];

  const missingField = fieldsMissing(fields,req.body);

  if(missingField){
    return res.status(403).send({ message: `${missingField} field is missing!` });
  }

  if(!req.userExists){
    return res.status(404).send({ message: `User does not exist!` });
  }

  try{
    const user = await db.User.findOne({where:{ email:req.body.email }})
    if(!bcrypt.compareSync(req.body.password,user.password)){
      return res.status(401).send({ message: `User credentials wrong!` });
    }
  }catch(err){
    return res.status(500).send({ message: "Server Error: " + err})
  }

  return res.status(202).send({ message: `User logged in!` });

};