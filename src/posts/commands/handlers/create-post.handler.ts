import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../create-post.handler';
import { PrismaService } from 'src/prisma.service';
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private readonly prisma: PrismaService) {}
  async execute(command: CreatePostCommand) {
    const { title, content, authorEmail } = command;
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    });
  }
}
