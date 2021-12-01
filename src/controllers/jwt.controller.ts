import express from "express";

export const verifyAccessToken = (req:express.Request, res:express.Response) => {
    res.status(200).send({message:"Token verified!"})
}

export const verifyRefreshToken = (req:express.Request, res:express.Response) => {
    res.status(200).send({message:"Token verified!"})
}