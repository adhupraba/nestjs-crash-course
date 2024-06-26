import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as fsp from "fs/promises";

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry: any) {
    const fmtEntry = `${Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Asia/Calcutta",
    }).format(new Date())}\t${entry}\n`;

    const logsDir = path.join(__dirname, "..", "..", "logs");

    try {
      if (!fs.existsSync(logsDir)) {
        await fsp.mkdir(logsDir);
      }

      await fsp.appendFile(path.join(logsDir, "myLogFile.log"), fmtEntry);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  log(message: any, context?: string): void {
    const ctx = context || this.context;
    const entry = `${ctx}\t${message}`;
    this.logToFile(entry);
    super.log(message, ctx);
  }

  error(message: any, stackOrContext?: string): void {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
