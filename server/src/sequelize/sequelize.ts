"use strict";

import { Sequelize } from "sequelize-typescript";

import User from "./models/User";

export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: "mysql",
  host: process.env.NODE_ENV === "prod" ? process.env.DB_HOST_ARN : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  storage: ":memory:",
  timezone: "-08:00",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci"
  }
  // models: [__dirname + "/models"] this way works too
});

sequelize.addModels([User]);
