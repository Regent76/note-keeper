import express from "express";
import bodyParser from "body-parser";
import jwt from "express-jwt";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import config from "./config";
import consts from "./const";
import routes from "../api/controllers";
import response from "../services/response";

const app = express();
const PORT = config.port || 5000;
let mongoUri;

(async () => {
  if (process.env.NODE_ENV !== consts.TEST.NODE_ENV) {
    mongoUri = config.mongo.srvUri;
  } else {
    const mongoServer = new MongoMemoryServer();
    mongoUri = await mongoServer.getUri();
  }

  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .catch(error => {
      process.exit(1);
    });
})().catch(err => (process.exit(1)));

app.use(
  jwt({ secret: config.jwtKey }).unless({
    path: [
      "/",
      "/v1/ping/health",
      "/v1/swagger",
      /^\/v1\/auth\//,
      { url: /^\/.*/, methods: ["OPTIONS"] }
    ]
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use(function(err, req, res, next) {
  if (err.statusCode === 400) {
    response.code400(res, "Could not parse request");
  } else if (err.constructor.name === "UnauthorizedError") {
    res.header("Access-Control-Allow-Origin", "*");
    response.code401(
      res,
      "UnauthorizedError: No authorization token was found"
    );
  } else {
    response.code500(res, err);
  }
});

app.get("/", (req, res) => {
  res.send("Note keeper API index page");
});
app.use("", routes);
app.use((req, res) => {
  response.code404(res, "url: " + req.originalUrl + " not found");
});

app.listen(config.port, err => {
  if (err) {
    return "Error occurred";
  }
});
