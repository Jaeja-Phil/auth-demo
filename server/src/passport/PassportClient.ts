"use strict";

import passport from "passport";

import FacebookPassport from "./FacebookPassport";
import GooglePassport from "./GooglePassport";
import JWTPassport from "./JWTPassport";
import KakaoPassport from "./KakaoPassport";
import PassportStrategy from "./constants/PassportStrategy";

export default class PassportClient {
  public static setup(): void {
    FacebookPassport.setup();
    JWTPassport.setup();
    GooglePassport.setup();
    KakaoPassport.setup();
  }

  public static authenticateUser(): any {
    return passport.authenticate(PassportStrategy.USER_JWT, { session: false });
  }

  public static authenticateFBToken(): any {
    return passport.authenticate(PassportStrategy.FACEBOOK_TOKEN, {
      session: false
    });
  }

  public static authenticateGoogleToken(): any {
    return passport.authenticate(PassportStrategy.GOOGLE_TOKEN, {
      session: false
    });
  }

  public static authenticateKakaoToken(): any {
    return passport.authenticate(PassportStrategy.KAKAO_TOKEN, {
      session: false
    });
  }
}
