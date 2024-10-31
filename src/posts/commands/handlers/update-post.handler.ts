import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../update-post.handler';
import { PrismaService } from 'src/prisma.service';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(private readonly prisma: PrismaService) {}
  async execute(command: UpdatePostCommand) {
    const { data, where } = command;
    return this.prisma.post.update({
      data,
      where,
    });
  }
}
