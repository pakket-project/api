import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@utils/logger';
import { PrismaService } from '@modules/prisma/prisma.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: new Logger()
  });

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(8080);
}
bootstrap();
