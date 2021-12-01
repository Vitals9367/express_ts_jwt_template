import jwt from "jsonwebtoken"
import config from '../config/jwt.config';

interface IGenerateAccessToken {
    name: String,
    email: String,
}

export const generateAccessToken = ({name, email}:IGenerateAccessToken): string => {
    try{
        const expires_in = 15;
        const access_token = jwt.sign({name, email},config.ACCESS_TOKEN_SECRET,{ expiresIn: expires_in});
    
        return access_token;
    }catch(err){
        console.log(err);
    }
}

export const generateRefreshToken = ({name, email}:IGenerateAccessToken): string => {
    try{
        const expires_in = '30d';
        const refresh_token = jwt.sign({ name, email }, config.REFRESH_TOKEN_SECRET, { expiresIn: expires_in });

        return refresh_token;
    }catch(err){
        console.log(err);
    }
}

export const verifyAccessToken = (access_token:string): boolean | string | jwt.JwtPayload => {
    try{
        const decoded = jwt.verify(access_token,config.ACCESS_TOKEN_SECRET);
        return decoded;
    }catch(err){
        console.log(err);
        return false;
    }
}

export const verifyRefreshToken = (refresh_token:string): boolean | string | jwt.JwtPayload => {
    try{
        const decoded = jwt.verify(refresh_token,config.REFRESH_TOKEN_SECRET);
        return decoded;
    }catch(err){
        console.log(err);
        return false;
    }
}