import { Request, Response } from "express";

import ClientsService from "../service/ClientService";

export default class ClientsController {
  private service: ClientsService;

  constructor() {
    this.service = new ClientsService();
  }

  async create(req: Request, res: Response) {
    try {
      const client = await this.service.create(req.body);
      return res.status(201).json(client);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const client = await this.service.update(id, req.body);
      return res.json(client);
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
      const client = await this.service.get(id);
      return client ? res.json(client) : res.status(404).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { q, page, pageSize } = req.query;
      const out = await this.service.list({
        q: q as string | undefined,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      });
      return res.json(out);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
