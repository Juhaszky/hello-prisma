import { Prisma } from '@prisma/client';

export class UpdatePostCommand {
  constructor(
    public readonly where: Prisma.PostWhereUniqueInput,
    public readonly data: Prisma.PostUpdateInput,
  ) {}
}
