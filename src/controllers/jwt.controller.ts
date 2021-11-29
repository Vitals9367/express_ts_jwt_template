import express from "express";

export const verifyToken = (req:express.Request, res:express.Response) => {
    res.status(200).send({message:"Token verified!"})
}