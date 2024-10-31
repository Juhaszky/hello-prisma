import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from './posts/commands/handlers/create-post.handler';
import { GetPostByIdHandler } from './posts/queries/handlers/get-post-by-id.handler';
import { GetPostsHandler } from './posts/queries/handlers/get-posts.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    CreatePostHandler,
    GetPostByIdHandler,
    GetPostsHandler,
  ],
})
export class AppModule {}
