import { Profile as PassportProfile } from "passport";
import { Request } from "express";

declare namespace PassportKakaoToken {
  interface StrategyStatic {
    Strategy: {
      new (
        options: StrategyOptionsWithRequest,
        verify: VerifyFunctionWithRequest
      ): StrategyInstance;
      new (options: StrategyOptions, verify: VerifyFunction): StrategyInstance;
    };
  }

  interface StrategyInstance {
    name: string;
    authenticate: (req: Request, options?: any) => void;
  }

  interface Profile extends PassportProfile {
    provider: string;
    id: any;
    username: string;
    displayName: string;
    email: string;
    _raw: string;
    _json: any;
  }

  interface StrategyOptions {
    clientID: string;
    callbackURL: string;
  }

  interface StrategyOptionsWithRequest extends StrategyOptions {
    passReqToCallback: true;
  }

  type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => void;

  type VerifyFunctionWithRequest = (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => void;
}

declare const PassportKakaoToken: PassportKakaoToken.StrategyStatic;

export = PassportKakaoToken;
