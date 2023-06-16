import "reflect-metadata"
import { Server } from './shared/infrastructure/Server';
import { container } from './shared/infrastructure/Container';
import { Configuration } from "./config";

const server = container.resolve<Server>(Server);
const config = container.resolve<Configuration>(Configuration);

server
  .start()
  .then(async () => {
    console.log(`Log level: ${config.APP_LOG_LEVEL}`);
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });