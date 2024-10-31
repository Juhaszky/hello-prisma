import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../update-post.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaWriteService } from 'src/prisma/prisma-write.service';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    private readonly prismaWrite: PrismaWriteService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(command: UpdatePostCommand) {
    const { data, where } = command;
    const updatedPost = await this.prismaWrite.post.update({
      data,
      where,
    });
    this.eventEmitter.emit('post.updated', { postId: where.id });
    return updatedPost;
  }
}
