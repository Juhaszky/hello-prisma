import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../update-post.command';
import { PrismaService } from 'src/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(command: UpdatePostCommand) {
    const { data, where } = command;
    const updatedPost = await this.prisma.post.update({
      data,
      where,
    });
    this.eventEmitter.emit('post.updated', { postId: where.id });
    return updatedPost;
  }
}
