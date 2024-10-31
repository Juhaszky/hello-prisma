import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilteredPostsQuery } from '../get-filtered-posts.query';
import { Post } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaReadService } from 'src/prisma/prisma-read.service';

@QueryHandler(GetFilteredPostsQuery)
export class GetFilteredPostsQueryHandler
  implements IQueryHandler<GetFilteredPostsQuery, Post[]>
{
  constructor(
    private readonly prismaRead: PrismaReadService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(query: GetFilteredPostsQuery): Promise<Post[]> {
    const posts = await this.prismaRead.post.findMany({
      where: {
        OR: [
          { title: { contains: query.searchString } },
          { content: { contains: query.searchString } },
        ],
      },
    });
    this.eventEmitter.emit('posts.filtered', {
      searchString: query.searchString,
    });
    return posts;
  }
}
