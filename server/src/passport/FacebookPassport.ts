"use strict";

import passport from "passport";
import FacebookTokenStrategy from "passport-facebook-token";

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID as string;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET as string;

export default class FacebookPassport {
  public static setup(): void {
    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    const strategy = new FacebookTokenStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        profileFields: ["email", "name"]
      },
      function (
        _accessToken: string,
        refreshToken: string,
        profile: FacebookTokenStrategy.Profile,
        done: (error: any, user?: any, info?: any) => void
      ) {
        done(null, profile, refreshToken);
      }
    );

    passport.use(strategy);
  }
}
