import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { UserDocument, UserModel } from './models/user';

const BEGIN_KEY = '-----BEGIN PUBLIC KEY-----\n';
const END_KEY = '\n-----END PUBLIC KEY-----\n';

interface JwtPayload {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  email?: string;
  [key: string]: any;
}

interface JwtHeader {
  alg: jwt.Algorithm;
  typ: string;
  kid: string;
}

interface JwtDecoded {
  payload: JwtPayload;
  header: JwtHeader;
  signature: any;
}

type PublicKey = string;

export class AuthService {
  private static instance?: AuthService;
  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  protected issuer: string =
    process.env.AUTH_ISSUER_URL ||
    'http://localhost:8080/auth/realms/development';
  protected algorithm = (process.env.AUTH_KEY_ALG || 'RS256') as jwt.Algorithm;
  protected publicKey?: PublicKey;

  protected async requestKey(): Promise<void> {
    try {
      const keyResponse = await axios(this.issuer);
      this.publicKey = BEGIN_KEY + keyResponse.data.public_key + END_KEY;
    } catch (error) {
      throw new Error('Not able to get public key from issuer');
    }
  }

  protected async getOrRequestKey(): Promise<PublicKey> {
    if (!this.publicKey) {
      await this.requestKey();
      if (!this.publicKey) {
        throw new Error('Not able to get public key from issuer');
      }
    }
    return this.publicKey;
  }

  protected getBearerToken(request: Request): string | undefined {
    const tokenRegex = /^[Bb]earer (.+)$/;
    const authorizationHeader = request.header('Authorization');
    if (authorizationHeader && tokenRegex.test(authorizationHeader)) {
      const matches = authorizationHeader.match(tokenRegex) as RegExpMatchArray;
      return matches[1];
    }
  }

  protected async getOrCreateUser({
    payload,
  }: JwtDecoded): Promise<UserDocument> {
    const user: UserDocument | null = await UserModel.findOne({
      sub: payload.sub,
    }).exec();
    if (!!user) {
      return user;
    }
    const newUser = new UserModel({
      sub: payload.sub,
      displayName: payload.name,
    });
    await newUser.save();
    return newUser;
  }

  protected returnError(response?: Response): (msg: string) => void {
    if (response) {
      return (msg: string) => response.status(401).send({ error: msg });
    }
    return (msg: string) => {
      throw new Error(msg);
    };
  }

  public authentication() {
    return async (
      request: Request,
      response?: Response,
      next?: (...args: any[]) => any,
    ): Promise<void> => {
      const token: string | undefined = this.getBearerToken(request);
      if (!token) {
        return this.returnError(response)('Provide Authentication');
      }
      try {
        const options: jwt.VerifyOptions = {
          algorithms: [this.algorithm],
          complete: true,
        };
        const decoded: JwtDecoded = jwt.verify(
          token,
          await this.getOrRequestKey(),
          options,
        ) as JwtDecoded;
        request.user = await this.getOrCreateUser(decoded);
        if (next) {
          next();
        }
      } catch (error) {
        return this.returnError(response)('Authentication failed');
      }
    };
  }
}
