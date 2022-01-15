import { Public } from '@decorators';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Public()
  @Get('/')
  root(): Record<string, string> {
    return {
      message: 'Pakket API'
    };
  }
}
