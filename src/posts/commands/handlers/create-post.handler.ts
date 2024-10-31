import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../create-post.command';
import { PrismaService } from 'src/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(command: CreatePostCommand) {
    const { title, content, authorEmail } = command;
    const post = await this.prisma.post.create({
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
