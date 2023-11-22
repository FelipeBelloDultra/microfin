import { verify, sign } from "jsonwebtoken";

import { env } from "../../config";

interface Signature {
  id: string;
  email: string;
}

interface JwtProps {
  authenticatedId: string;
  token: string;
}

type DecodedToken = Signature & { exp: number };

export class Jwt {
  readonly authenticatedId: string;
  readonly token: string;

  private constructor({ authenticatedId, token }: JwtProps) {
    this.authenticatedId = authenticatedId;
    this.token = token;
  }

  static signIn(signature: Signature): Jwt {
    const token = sign(
      {
        id: signature.id,
        email: signature.email,
      },
      env.jwt.secretKey,
      {
        expiresIn: "1h",
      }
    );

    return new Jwt({ authenticatedId: signature.id, token });
  }

  static decodeToken(token: string): DecodedToken {
    try {
      const decoded = verify(token, env.jwt.secretKey) as DecodedToken;

      return decoded;
    } catch (error) {
      throw new Error("Invalid jwt token");
    }
  }
}
