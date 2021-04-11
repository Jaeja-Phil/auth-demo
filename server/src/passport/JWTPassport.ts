"use strict";

import passport from "passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";

import { TPayload } from "../auth/JWTToken";
import User from "../sequelize/models/User";
import PassportStrategy from "./constants/PassportStrategy";

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
        async function(jwtPayload: TPayload, cb: VerifiedCallback) {
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

    // Subscribed user, pass as long as they are logged in.
    passport.use(
      PassportStrategy.SUBSCRIBER_JWT,
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: JWT_SECRET
        },
        async function(jwtPayload: TPayload, cb: VerifiedCallback) {
          const user = await User.gen(parseInt(jwtPayload.id));
          if (user && jwtPayload.isSubscriber) {
            return cb(null, user);
          } else {
            return cb(
              !user
                ? {
                    msg:
                      "The user with id: " + jwtPayload.id + " does not exist"
                  }
                : {
                    msg:
                      "The user with id: " +
                      jwtPayload.id +
                      " is not subscribed"
                  }
            );
          }
        }
      )
    );

    // Admin user, pass as long as they are logged in.
    passport.use(
      PassportStrategy.ADMIN_JWT,
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: JWT_SECRET
        },
        async function(jwtPayload: TPayload, cb: VerifiedCallback) {
          const user = await User.gen(parseInt(jwtPayload.id));
          if (user && jwtPayload.isAdmin) {
            return cb(null, user);
          } else {
            return cb(
              !user
                ? {
                    msg:
                      "The user with id: " + jwtPayload.id + " does not exist"
                  }
                : {
                    msg: "The user with id: " + jwtPayload.id + " is not admin"
                  }
            );
          }
        }
      )
    );
  }
}
