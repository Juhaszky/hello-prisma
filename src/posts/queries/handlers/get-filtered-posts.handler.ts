import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilteredPostsQuery } from '../get-filtered-posts.query';
import { Post } from '@prisma/client';
import { PostService } from 'src/post.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@QueryHandler(GetFilteredPostsQuery)
export class GetFilteredPostsQueryHandler
  implements IQueryHandler<GetFilteredPostsQuery, Post[]>
{
  constructor(
    private readonly postService: PostService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(query: GetFilteredPostsQuery): Promise<Post[]> {
    const posts = await this.postService.posts({
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
