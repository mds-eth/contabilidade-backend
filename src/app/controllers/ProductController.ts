import { Request, Response } from "express";

import ProductService from "app/service/ProductService";

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  async create(req: Request, res: Response) {
    try {
      const product = await this.service.create(req.body);
      return res.status(201).json(product);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await this.service.update(id, req.body);
      return res.json(product);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.service.remove(id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.service.get(id);
      return product ? res.json(product) : res.status(404).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { q, minPrice, maxPrice, skip, take } = req.query;

      const products = await this.service.list({
        q: q as string | undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined,
      });

      return res.json(products);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
