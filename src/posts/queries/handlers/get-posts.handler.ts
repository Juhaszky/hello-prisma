import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from '../get-posts.query';
import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(private readonly prisma: PrismaService) {}
  async execute(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }
}
