import { User as JWTUser } from "./User";

declare global {
  namespace Express {
    interface Request {
      user?: JWTUser;
      token?: string;
      ["x-correlation-id"]?: string;
    }
  }
}
