import Database from "@lib/database";
import { PrismaClient } from "@prisma/client";

export default abstract class BaseRepository {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }
}
