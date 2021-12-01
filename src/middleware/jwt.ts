import express from "express";
import jwt from "jsonwebtoken";
import config from "../config/jwt.config";

const checkAccessToken = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const access_token = req.headers.authorization.split(" ")[1];

  if (!access_token) {
    return res.status(403).send({
      message: "No access token provided!"
    });
  }

  jwt.verify(access_token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.body.name = decoded.name;
    req.body.email = decoded.email;
    next();
  });
};

const checkRefreshToken = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const refresh_token = req.cookies['refresh-token'];

  if (!refresh_token) {
    return res.status(403).send({
      message: "No refresh token provided!"
    });
  }

  jwt.verify(refresh_token, config.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.body.name = decoded.name;
    req.body.email = decoded.email;
    next();
  });
};

export {checkAccessToken, checkRefreshToken};