import { AsyncLocalStorage } from "node:async_hooks";

type RequestContextData = {
  correlationId: string;
};

export const requestContext = new AsyncLocalStorage<RequestContextData>();
