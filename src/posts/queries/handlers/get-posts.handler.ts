import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from '../get-posts.query';
import { Post } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaReadService } from 'src/prisma/prisma-read.service';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    private readonly prismaRead: PrismaReadService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(): Promise<Post[]> {
    const posts = await this.prismaRead.post.findMany();
    this.eventEmitter.emit('posts.fetched', posts);
    return posts;
  }
}
