import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma.service';
import { GetPostByIdQuery } from '../get-post-by-id.query';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}
  async execute(query: GetPostByIdQuery) {
    return this.prisma.post.findUnique({
      where: { id: query.postId },
    });
  }
}
