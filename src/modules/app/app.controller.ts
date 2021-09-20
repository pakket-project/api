import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  root(): Record<string, string> {
    return {
      message: 'Pakket API',
      documentation: 'https://api.pakket.sh/swagger'
    };
  }
}
