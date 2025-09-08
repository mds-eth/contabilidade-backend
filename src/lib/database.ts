import { PrismaClient, Prisma } from "@prisma/client";
import { Logger } from "../utils/Logger";

class Database {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: [
          { emit: "stdout", level: "query" },
          { emit: "stdout", level: "info" },
          { emit: "stdout", level: "warn" },
          { emit: "stdout", level: "error" },
        ],
      });

      Database.instance
        .$connect()
        .then(() => {
          Logger.success("Database (SQLite) connected successfully");
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          Logger.error("Error connecting to the database:", msg);
        });

      process.on("SIGINT", async () => {
        await Database.instance.$disconnect();
        Logger.error("Database connection closed (SIGINT)");
        process.exit(0);
      });
    }

    return Database.instance;
  }

  public static async transaction<T>(
    callback: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    const prisma = Database.getInstance();
    return prisma.$transaction((tx: Prisma.TransactionClient) => callback(tx));
  }
}

export default Database;
