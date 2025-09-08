import { ProductRepository } from "../repositories/ProductRepository";
import { ProductFormData } from "../schemas/ProductSchema";

export default class ProductService {
  private repository = new ProductRepository();

  async create(input: Omit<ProductFormData, "id" | "data_criacao">) {
    const data: Omit<ProductFormData, "id"> = {
      ...input,
      data_criacao: new Date(),
    };
    return this.repository.create(data);
  }

  async update(
    id: string,
    input: Partial<Omit<ProductFormData, "id" | "createdAt">>
  ) {
    return this.repository.update(id, input);
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }

  async get(id: string) {
    return this.repository.findById(id);
  }

  async list(params?: {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    skip?: number;
    take?: number;
  }) {
    return this.repository.list({
      q: params?.q,
      minPrice: params?.minPrice,
      maxPrice: params?.maxPrice,
      skip: params?.skip,
      take: params?.take,
    });
  }
}
