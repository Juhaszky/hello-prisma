import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilteredPostsQuery } from '../get-filtered-posts.query';
import { Post } from '@prisma/client';
import { PostService } from 'src/post.service';

@QueryHandler(GetFilteredPostsQuery)
export class GetFilteredPostsQueryHandler
  implements IQueryHandler<GetFilteredPostsQuery, Post[]>
{
  constructor(private readonly postService: PostService) {}

  async execute(query: GetFilteredPostsQuery): Promise<Post[]> {
    return this.postService.posts({
      where: {
        OR: [
          { title: { contains: query.searchString } },
          { content: { contains: query.searchString } },
        ],
      },
    });
  }
}
