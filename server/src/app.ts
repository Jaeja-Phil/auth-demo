"use strict";

import path from "path";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import PassportClient from "./passport/PassportClient";
import { sequelize } from "./sequelize/sequelize";
// Create Express server
const app = express();

// Connect to Database
if (process.env.NODE_ENV === "dev") {
  // set up DevDB on dev environment
  sequelize.sync();
} else {
  // connect to ProdDB on prod environment
  sequelize.sync();
}

// Set CORS whitelist
const whitelist =
  process.env.NODE_ENV === "prod"
    ? /(https:\/\/)?(([^.]+)\.)?YOUR_DOMAIN.com/gi
    : /http:\/\/localhost:3000/gi;

const corsOptions = {
  origin: (
    origin: string | undefined,
    cb: (err: Error | null, allow?: boolean) => void
  ) => {
    if (origin === undefined || origin.match(whitelist) !== null) {
      return cb(null, true);
    } else {
      return cb(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
  exposedHeaders: ["x-auth-token"],
  allowedHeaders: ["Authorization", "access_token"]
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "build")));
}

PassportClient.setup();

app.use((req: Request, res: Response, next: NextFunction) => {
  // redirect non-secure connections to https on prod environment
  if (
    !req.secure &&
    req.get("X-Forwarded-Proto") !== "https" &&
    process.env.NODE_ENV !== "dev"
  ) {
    res.redirect("https://" + req.headers.host + req.url);
    return;
  }
  next();
});

/**
 * Routers
 */

// add apiRouter
app.use("/api/v1", () => {});

app.set("port", process.env.PORT || 3000);

export default app;
