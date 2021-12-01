import express from "express";
import { verifyAccessToken, verifyRefreshToken } from "../services/jwtService";

export const verifyAccess = (req:express.Request, res:express.Response) => {
    const access_token = req.headers.authorization.split(" ")[1];

    const verify_response = verifyAccessToken(access_token);

    if(!verify_response) return res.status(401).send({message:"Token denied!"})

    return res.status(200).send({message:"Access token verified!", decoded: verify_response})
}

export const verifyRefresh = (req:express.Request, res:express.Response) => {

    const refresh_token = req.cookies['refresh-token'];

    const refresh_response = verifyRefreshToken(refresh_token);

    if(!refresh_response) return res.status(401).send({message:"Token denied!"})

    return res.status(200).send({message:"Refres token verified!", decoded: refresh_response})
}