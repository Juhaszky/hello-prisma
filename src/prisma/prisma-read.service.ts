import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaReadService extends PrismaClient {
  constructor() {
    super({ datasources: { db: { url: process.env.READ_DATABASE_URL } } });
  }
}
