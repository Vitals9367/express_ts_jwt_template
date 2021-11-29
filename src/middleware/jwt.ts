import express from "express";
import jwt from "jsonwebtoken";
import config from "../config/auth.config";

const verifyToken = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token[0], config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.body.userId = decoded.id;
    next();
  });
};

export default verifyToken;