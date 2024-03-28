import { Server } from "http";
import app from "./app";

const port = 5000;

let server:Server
function main() {
 server= app.listen(port, () => {
    console.log(` blood Bucket listening on port ${port} `);
  });
}

main();
