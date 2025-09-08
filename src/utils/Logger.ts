import chalk from "chalk";

export class Logger {
  static info(message: string, context?: any) {
    console.log(chalk.blue("[INFO]"), message);
    if (context) console.dir(context, { depth: null });
  }

  static success(message: string, context?: any) {
    console.log(chalk.green("[SUCCESS]"), message);
    if (context) console.dir(context, { depth: null });
  }

  static warn(message: string, context?: any) {
    console.warn(chalk.yellow("[WARNING]"), message);
    if (context) console.dir(context, { depth: null });
  }

  static error(message: string, context?: any) {
    console.error(chalk.red("[ERROR]"), message);
    if (context) console.dir(context, { depth: null });
  }
}
