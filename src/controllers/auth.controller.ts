import express from "express";
import jwt from 'jsonwebtoken';

import db from "../models";
import config from "../config/auth.config";

import fieldsMissing from '../utils/fieldHelpers';
import { comparePassword, hashPassword } from "../services/authService";
import { generateAccessToken, generateRefreshToken} from '../services/jwtService';
import { validate } from "uuid";
import { validateEmail, validatePassword } from "../utils/stringValidators";

const User = db.User;

//const Op = db.Sequelize.Op;

export const signup = async (req:express.Request, res:express.Response) => {

  const fields = ['name','email','password'];

  const missing_field = fieldsMissing(fields,req.body);

  if(req.userExists) return res.status(403).send({ message: `Email already exists!` });
  if(missing_field) return res.status(403).send({ message: `${missing_field} field is missing!` });
  if(!validateEmail(req.body.email)) return res.status(401).send({ message: `Email incorrect!` });
  if(!validatePassword(req.body.password)) return res.status(401).send({ message: `Password incorrect!` });

  try {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      })

      const access_token = generateAccessToken({email: req.body.name, name: req.body.email});
      const refresh_token = generateRefreshToken({email: req.body.name, name: req.body.email});
  
      //days * hours * minutes * seconds *
      const max_age = 31 * 24 * 60 * 60 * 1000
  
      res.cookie('refresh-token',refresh_token,{maxAge: max_age, httpOnly:true});
      return res.status(202).send({ message: "User was registered successfully!", access_token });
      
  }catch (error){
    return res.status(500).send({ message: "Server Error: " + error})
  }
};

export const signin = async (req:express.Request, res:express.Response) => {

  const fields = ['email','password'];

  const missing_field = fieldsMissing(fields,req.body);

  if(missing_field) return res.status(403).send({ message: `${missing_field} field is missing!` });
  if(!req.userExists) return res.status(404).send({ message: `User does not exist!` });
  if(!validateEmail(req.body.email)) return res.status(401).send({ message: `Email incorrect!` });

  try{
    const user = await db.User.findOne({where:{ email:req.body.email }})
    if(!await comparePassword(req.body.password, user.password)) return res.status(401).send({ message: `User credentials wrong!` });
    
    const access_token = generateAccessToken({email: user.email, name: user.name});
    const refresh_token = generateRefreshToken({email: user.email, name: user.name});

    //days * hours * minutes * seconds *
    const max_age = 31 * 24 * 60 * 60 * 1000

    res.cookie('refresh-token',refresh_token,{maxAge: max_age, httpOnly:true});
    return res.status(202).send({ message: `User logged in!`, access_token});
 
  }catch(err){
    return res.status(500).send({ message: "Server Error: " + err})
  }
};