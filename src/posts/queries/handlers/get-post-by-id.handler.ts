import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostByIdQuery } from '../get-post-by-id.query';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaReadService } from 'src/prisma/prisma-read.service';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(
    private readonly prismaRead: PrismaReadService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(query: GetPostByIdQuery) {
    const post = await this.prismaRead.post.findUnique({
      where: { id: query.postId },
    });
    this.eventEmitter.emit('post.by.id', { postId: post.id });
    return post;
  }
}
