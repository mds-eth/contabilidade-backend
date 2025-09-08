import { z } from "zod";

export const createProductSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(1, "O nome é obrigatório"),
  preco: z
    .number({ invalid_type_error: "Preço deve ser um número" })
    .positive("O preço deve ser maior que zero"),
  estoque: z
    .number({ invalid_type_error: "Estoque deve ser um número" })
    .int("O estoque deve ser um número inteiro")
    .nonnegative("O estoque não pode ser negativo"),
  data_criacao: z.date().optional(),
});

export type ProductFormData = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();
