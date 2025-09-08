import { ClientsRepository } from "../repositories/ClientRepository";
import { ClientFormData } from "../schemas/ClientSchema";

export default class ClientsService {
  private repository = new ClientsRepository();

  async create(input: ClientFormData) {
    return this.repository.create(input);
  }

  async update(id: string, input: Partial<ClientFormData>) {
    return this.repository.update(id, input);
  }

  async remove(id: string) {
    return this.repository.remove(id);
  }

  async get(id: string) {
    return this.repository.findById(id);
  }

  async list(params?: { q?: string; page?: number; pageSize?: number }) {
    const take = params?.pageSize ?? 50;
    const skip = params?.page ? (params.page - 1) * take : 0;
    return this.repository.list({
      q: params?.q,
      skip,
      take,
    });
  }
}
