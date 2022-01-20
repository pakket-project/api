import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import 'multer';

@Controller('/package')
export class PackageController {
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1000000
      }
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<void> {
    await writeFile(join(process.cwd(), 'data', file.originalname), file.buffer);
  }
}
