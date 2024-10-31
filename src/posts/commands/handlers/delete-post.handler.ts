import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../delete-post.handler';
import { PrismaService } from 'src/prisma.service';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(private readonly prisma: PrismaService) {}
  async execute(command: DeletePostCommand): Promise<void> {
    await this.prisma.post.delete({ where: { id: command.id } });
  }
}
