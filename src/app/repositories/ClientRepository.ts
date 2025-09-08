import BaseRepository from "./BaseRepository";
import { ClientFormData } from "../schemas/ClientSchema";
import { Logger } from "../../utils/Logger";
import { Prisma } from "@prisma/client";

export class ClientsRepository extends BaseRepository {
  async create(data: ClientFormData) {
    try {
      const result = await this.prisma.clientes.create({ data });
      Logger.info("Cliente criado com sucesso", result);
      return result;
    } catch (err: any) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        Logger.warn("Tentativa de criar cliente duplicado", { data });
        throw new Error("Já existe um cliente cadastrado com esse e-mail");
      }

      Logger.error("Falha ao criar cliente", err);
      throw err;
    }
  }

  async update(id: string, data: Partial<ClientFormData>) {
    try {
      const result = await this.prisma.clientes.update({ where: { id }, data });
      Logger.info(`Cliente atualizado com sucesso: ${id}`, result);
      return result;
    } catch (err: any) {
      Logger.error(`Falha ao atualizar cliente ${id}`, err);
      throw err;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.clientes.delete({ where: { id } });
      Logger.info(`Cliente deletado com sucesso: ${id}`, result);
      return result;
    } catch (err: any) {
      Logger.error(`Falha ao deletar cliente ${id}`, err);
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const result = await this.prisma.clientes.findUnique({ where: { id } });
      Logger.info(`Cliente buscado com sucesso: ${id}`, result);
      return result;
    } catch (err: any) {
      Logger.error(`Falha ao buscar cliente ${id}`, err);
      throw err;
    }
  }

  async list(params?: { q?: string; skip?: number; take?: number }) {
    try {
      const where: any = {
        OR: params?.q
          ? [
              { nome: { contains: params.q } },
              { email: { contains: params.q } },
            ]
          : undefined,
      };

      const result = await this.prisma.clientes.findMany({
        where,
        orderBy: { data_criacao: "desc" },
        skip: params?.skip,
        take: params?.take ?? 50,
      });

      Logger.info("Lista de clientes obtida com sucesso", {
        filtros: params,
        quantidade: result.length,
      });

      return result;
    } catch (err: any) {
      Logger.error("Falha ao listar clientes", err);
      throw err;
    }
  }
}
