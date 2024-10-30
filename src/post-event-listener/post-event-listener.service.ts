import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PostEventListenerService {
  @OnEvent('posts.get')
  handlePostGetEvent(payload: { postName: string }) {
    console.log(`Post Get Event Triggered with postname ${payload.postName}`);
  }
}
