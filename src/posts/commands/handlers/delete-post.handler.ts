import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../delete-post.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaWriteService } from 'src/prisma/prisma-write.service';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    private readonly prismaWrite: PrismaWriteService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(command: DeletePostCommand): Promise<void> {
    await this.prismaWrite.post.delete({ where: { id: command.id } });
    this.eventEmitter.emit('post.deleted', { postId: command.id });
  }
}
