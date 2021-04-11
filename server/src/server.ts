"use strict";

import dotenv from "dotenv";
import errorHandler from "errorhandler";

import app from "./app";

// Setup .env
dotenv.config({ path: ".env" });

if (process.env.NODE_ENV === "dev") {
  // only use in development
  app.use(errorHandler());
}

const server = app.listen(app.get("port"), () => {
  console.log("Server ready at http://localhost:%d", app.get("port"));
});

export default server;
