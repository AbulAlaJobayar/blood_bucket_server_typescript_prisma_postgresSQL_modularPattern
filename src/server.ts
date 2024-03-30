import { Server } from "http";
import app from "./app";
import config from "./app/config";


let server:Server
async function main() {
  try {
    server= app.listen(config.port, () => {
      console.log(` blood Bucket listening on port ${config.port} `);
    });
  } catch (error) {
    console.log(error)
  }

}

main();
process.on('unhandledRejection', () => {
  console.log(`unhandled Rejection is Detected,shuting Down `)
  if (server) {
      server.close(() => {
          process.exit(1);
      })
  }
  process.exit(1)
});
process.on('uncaughtException', () => {
  console.log(`uncaught Exception is detected , shuting Down`)
  process.exit(1)
});






