import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaWriteService extends PrismaClient {
  constructor() {
    super({ datasources: { db: { url: process.env.WRITE_DATABASE_URL } } });
  }
}
