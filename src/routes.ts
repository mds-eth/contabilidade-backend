import { Router } from "express";
import ProductController from "./app/controllers/ProductController";
import ClientsController from "./app/controllers/ClientsController";
import { validate } from "./app/middlewares/validate";
import {
  createProductSchema,
  updateProductSchema,
} from "./app/schemas/ProductSchema";
import {
  createClientSchema,
  updateClientSchema,
} from "./app/schemas/ClientSchema";

export default class Routes {
  public router: Router;

  private productsController: ProductController;
  private clientsController: ClientsController;

  constructor() {
    this.router = Router();
    this.productsController = new ProductController();
    this.clientsController = new ClientsController();
    this.routes();
  }

  private routes(): void {
    this.router.get("/health", (_req, res) => {
      res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    });

    this.router.get(
      "/produtos",
      this.productsController.list.bind(this.productsController)
    );
    this.router.get(
      "/produtos/:id",
      this.productsController.show.bind(this.productsController)
    );
    this.router.post(
      "/produtos",
      validate(createProductSchema),
      this.productsController.create.bind(this.productsController)
    );
    this.router.put(
      "/produtos/:id",
      validate(updateProductSchema),
      this.productsController.update.bind(this.productsController)
    );
    this.router.delete(
      "/produtos/:id",
      this.productsController.remove.bind(this.productsController)
    );

    this.router.get(
      "/clientes",
      this.clientsController.list.bind(this.clientsController)
    );
    this.router.get(
      "/clientes/:id",
      this.clientsController.show.bind(this.clientsController)
    );
    this.router.post(
      "/clientes",
      validate(createClientSchema),
      this.clientsController.create.bind(this.clientsController)
    );
    this.router.put(
      "/clientes/:id",
      validate(updateClientSchema),
      this.clientsController.update.bind(this.clientsController)
    );
    this.router.delete(
      "/clientes/:id",
      this.clientsController.remove.bind(this.clientsController)
    );
  }
}
