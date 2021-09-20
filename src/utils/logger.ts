import chalk, { Chalk } from 'chalk';
import dayjs from 'dayjs';
import { LoggerService, LogLevel } from '@nestjs/common';

export class Logger implements LoggerService {
  context: string;

  constructor(context?: string) {
    this.context = context || '';
    this.timeFormat = 'HH:mm:ss';
    this.colors = new Map<LogLevel, Chalk>([
      ['log', chalk.greenBright.bold],
      ['warn', chalk.yellow.bold],
      ['error', chalk.redBright.bold],
      ['debug', chalk.gray.bold],
      ['verbose', chalk.blueBright.bold]
    ]);
  }

  private readonly colors: Map<LogLevel, Chalk>;

  private readonly timeFormat: string;

  private logMessage(
    message: string,
    level: LogLevel,
    context: string,
    metadata?: Record<string, unknown>
  ): void {
    const time: string = dayjs().format(this.timeFormat);
    const levelColorFn = this.colors.get(level) || chalk.gray.bold;
    const contextMessage = context || this.context || 'Unknown';

    const log = (message: string): void => {
      // eslint-disable-next-line no-console
      console.log(
        [
          chalk.blueBright.bold(time),
          chalk.gray(`(${levelColorFn(level.toUpperCase())})`),
          chalk.gray(contextMessage),
          message
        ]
          .filter((i) => i)
          .join(' ')
      );
    };

    log(message);

    if (metadata) {
      // eslint-disable-next-line no-console
      console.log(metadata);
    }
  }

  log(message: string, context?: string): void {
    this.logMessage(message, 'log', context);
  }

  error(message: string, trace: string, context?: string): void {
    this.logMessage(message, 'error', context, { error: trace });
  }

  warn(message: string, context: string): void {
    this.logMessage(message, 'warn', context);
  }

  debug(message: string, context: string): void {
    this.logMessage(message, 'debug', context);
  }

  verbose(message: string, context: string): void {
    this.logMessage(message, 'verbose', context);
  }
}
