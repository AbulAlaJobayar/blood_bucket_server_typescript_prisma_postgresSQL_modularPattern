import { Server } from "http";
import app from "./app";
import config from "./app/config";


let server:Server
function main() {
 server= app.listen(config.port, () => {
    console.log(` blood Bucket listening on port ${config.port} `);
  });
}

main();
