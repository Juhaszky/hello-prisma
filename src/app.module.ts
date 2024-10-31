import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from './posts/commands/handlers/create-post.handler';
import { GetPostByIdHandler } from './posts/queries/handlers/get-post-by-id.handler';
import { GetPostsHandler } from './posts/queries/handlers/get-posts.handler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostEventListenerService } from './post-event-listener/post-event-listener.service';

@Module({
  imports: [CqrsModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    CreatePostHandler,
    GetPostByIdHandler,
    GetPostsHandler,
    PostEventListenerService,
  ],
})
export class AppModule {}
