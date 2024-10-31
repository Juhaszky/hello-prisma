import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './posts/commands/create-post.command';
import { GetPostByIdQuery } from './posts/queries/get-post-by-id.query';
import { GetPostsQuery } from './posts/queries/get-posts.query';
import { UpdatePostCommand } from './posts/commands/update-post.command';
import { GetFilteredPostsQuery } from './posts/queries/get-filtered-posts.query';
import { DeletePostCommand } from './posts/commands/delete-post.command';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @Get('post/:id')
  async getPostById(@Param('id') id: number): Promise<PostModel> {
    return this.queryBus.execute(new GetPostByIdQuery(id));
  }
  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.queryBus.execute(new GetPostsQuery());
  }
  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.queryBus.execute(new GetFilteredPostsQuery(searchString));
  }
  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.commandBus.execute(
      new CreatePostCommand(title, content, authorEmail),
    );
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: number): Promise<PostModel> {
    return this.commandBus.execute(
      new UpdatePostCommand({ id }, { published: true }),
    );
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: number): Promise<PostModel> {
    return this.commandBus.execute(new DeletePostCommand(id));
  }
}
