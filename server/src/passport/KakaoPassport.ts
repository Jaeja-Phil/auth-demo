"use strict";

import passport from "passport";
import KakaoTokenStrategy, { Profile } from "passport-kakao-token";

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID as string;

export default class KakaoPassport {
  public static setup(): void {
    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    const strategy = new KakaoTokenStrategy.Strategy(
      {
        clientID: KAKAO_CLIENT_ID,
        callbackURL: "/api/v1/auth/kakao/callback"
      },
      function (
        _accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void
      ) {
        done(null, profile, refreshToken);
      }
    );

    passport.use(strategy);
  }
}
