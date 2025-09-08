import { z } from "zod";

export const createClientSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

export type ClientFormData = z.infer<typeof createClientSchema>;

export const updateClientSchema = createClientSchema.partial();
