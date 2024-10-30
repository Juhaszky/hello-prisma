import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostEventListenerService } from './post-event-listener/post-event-listener.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PostService, UserService, PrismaService, PostEventListenerService],
})
export class AppModule {}
