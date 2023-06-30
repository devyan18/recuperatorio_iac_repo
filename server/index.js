import express from "express";
import { connect } from "mongoose";
import * as mysql from "mysql2";

const app = express();

app.get("/check-mongodb-connection", (_req, res) => {
  connect(`mongodb://${process.env.MONGO_DB_HOST}:27017`)
    .then(() => {
      res.send("connected");
    })
    .catch((err) => {
      console.log(process.env.MONGO_DB_HOST);
      console.log(err);
      res.send("not connected");
    });
});

app.get("/check-mariadb-connection", (_req, res) => {
  const connection = mysql.createConnection({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
  });

  const query = connection.query("SELECT 1;");

  if (query) {
    return res.send("connected");
  }

  res.send("not connected");
});

app.listen(4000, () => {
  console.log("server running");
});
