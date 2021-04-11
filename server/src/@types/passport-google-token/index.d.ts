"use strict";

import { Profile as PassportProfile } from "passport";
import { Request } from "express";

declare namespace PassportGoogleToken {
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

  interface ValueObject {
    value: string;
  }

  interface Profile extends PassportProfile {
    provider: string;
    id: string;
    displayName: string;
    name: {
      familyName: string;
      givenName: string;
      middleName: string;
    };
    emails: ValueObject[];
    _raw: string;
    _json: any;
  }

  interface StrategyOptions {
    clientID: string;
    clientSecret: string;
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

declare const PassportGoogleToken: PassportGoogleToken.StrategyStatic;

export = PassportGoogleToken;
