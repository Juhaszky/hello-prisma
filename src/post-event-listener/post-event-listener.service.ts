import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Post } from '@prisma/client';
import { PrismaReadService } from 'src/prisma/prisma-read.service';
import { PrismaWriteService } from 'src/prisma/prisma-write.service';

@Injectable()
export class PostEventListenerService {
  constructor(
    private readonly prismaWrite: PrismaWriteService,
    private readonly prismaRead: PrismaReadService,
  ) {}
  @OnEvent('posts.fetched')
  handlePostGetEvent(posts: Post[]) {
    console.log(`Post Get Event Triggered with postname`);
    posts.forEach((post) => console.log(post));
  }
  @OnEvent('posts.created')
  async handlePostCreatedEvent(payload: { postId: number }) {
    const post = await this.prismaWrite.post.findUnique({
      where: { id: payload.postId },
    });
    if (post) {
      const author = await this.prismaWrite.user.findUnique({
        where: { id: post.authorId },
      });
      await this.prismaRead.post.create({
        data: {
          title: post.title,
          content: post.content,
          author: { connect: { email: author.email } },
        },
      });
    }
  }
}
