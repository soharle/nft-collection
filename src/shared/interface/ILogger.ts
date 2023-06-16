import { Handler } from "express";

export interface ILogger {
  stream(): Handler;
  debug(message: string): void;
  info(message: string): void;
  error(message: string): void;
  warning(message: string): void;
  critical(message: string): void;
}
