import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from '../get-posts.query';
import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany();
    this.eventEmitter.emit('posts.fetched', posts);
    return posts;
  }
}
