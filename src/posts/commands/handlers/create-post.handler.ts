import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../create-post.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaWriteService } from 'src/prisma/prisma-write.service';
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    private readonly prismaWrite: PrismaWriteService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(command: CreatePostCommand) {
    const { title, content, authorEmail } = command;
    const post = await this.prismaWrite.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    });
    this.eventEmitter.emit('post.created', { postId: post.id });
    return post;
  }
}
