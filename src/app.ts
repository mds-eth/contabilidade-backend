import express, { Application } from "express";

import cors from "cors";

import Routes from "./routes";

import { correlationIdMiddleware } from "@middlewares/x.correlation.id";

import swaggerRouter from "./swagger";

export class App {
  public app: Application;
  private routes: Routes;

  constructor() {
    this.app = express();

    this.app.use(correlationIdMiddleware);

    this.routes = new Routes();

    this.middlewares();

    this.initializeRoutes();
  }

  private middlewares(): void {
    this.app.use(cors());

    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use("/api/v1", this.routes.router);

    this.app.use("/", swaggerRouter);
  }
}
