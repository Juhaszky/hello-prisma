import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma.service';
import { GetPostByIdQuery } from '../get-post-by-id.query';
import { EventEmitter2 } from '@nestjs/event-emitter';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(query: GetPostByIdQuery) {
    const post = await this.prisma.post.findUnique({
      where: { id: query.postId },
    });
    this.eventEmitter.emit('post.by.id', { postId: post.id });
    return post;
  }
}
