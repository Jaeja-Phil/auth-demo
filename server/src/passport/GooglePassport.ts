"use strict";

import passport from "passport";
import GoogleTokenStrategy from "passport-google-token";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export default class GooglePassport {
  public static setup(): void {
    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    const strategy = new GoogleTokenStrategy.Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
      },
      function (
        _accessToken: string,
        refreshToken: string,
        profile: GoogleTokenStrategy.Profile,
        done: (error: any, user?: any, info?: any) => void
      ) {
        done(null, profile, refreshToken);
      }
    );

    passport.use(strategy);
  }
}
