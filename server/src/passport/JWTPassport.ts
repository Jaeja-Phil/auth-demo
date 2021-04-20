"use strict";

import passport from "passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";

import User from "../sequelize/models/User";
import PassportStrategy from "./constants/PassportStrategy";

type TPayLoad = {
  id: string;
};

const JWT_SECRET = process.env.JWT_SECRET as string;

export default class JWTPassport {
  public static setup(): void {
    // Basic user, pass as long as they are logged in.
    passport.use(
      PassportStrategy.USER_JWT,
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: JWT_SECRET
        },
        async function (jwtPayload: TPayLoad, cb: VerifiedCallback) {
          const user = await User.gen(parseInt(jwtPayload.id));
          if (user) {
            return cb(null, user);
          } else {
            return cb({
              msg: "The user with id: " + jwtPayload.id + " does not exist"
            });
          }
        }
      )
    );
  }
}
