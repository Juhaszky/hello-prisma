import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Post } from '@prisma/client';

@Injectable()
export class PostEventListenerService {
  @OnEvent('posts.fetched')
  handlePostGetEvent(posts: Post[]) {
    console.log(`Post Get Event Triggered with postname`);
    posts.forEach((post) => console.log(post));
  }
}
