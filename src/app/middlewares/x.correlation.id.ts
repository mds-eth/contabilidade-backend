import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { requestContext } from "utils/RequestContext";

export const CORRELATION_NAME = "x-correlation-id";

export const correlationIdMiddleware = (
  req: Request & { correlationId?: string },
  res: Response,
  next: NextFunction
) => {
  const correlationId =
    (req.headers[CORRELATION_NAME] as string) || randomUUID();

  req[CORRELATION_NAME] = correlationId;

  res.setHeader(CORRELATION_NAME, correlationId);

  requestContext.run({ correlationId }, () => {
    next();
  });
};
