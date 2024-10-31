import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../delete-post.command';
import { PrismaService } from 'src/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(command: DeletePostCommand): Promise<void> {
    await this.prisma.post.delete({ where: { id: command.id } });
    this.eventEmitter.emit('post.deleted', { postId: command.id });
  }
}
