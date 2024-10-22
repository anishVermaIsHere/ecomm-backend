import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import appConfig from "./config/appconfig.js";
import { dbConnection } from "./config/db/connect.js";
import  router  from "./routes/index.js";


cors({
  origin: appConfig.corsOrigin,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  credentials: true,
});

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));
app.use('/api', router);

app.get("/", (_, res) => {
  res.json({
    message: `Ecommerce server running at port:${appConfig.port}`,
    author: 'Anish Verma',
    time: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  });
});

const server = app.listen(appConfig.port, () => {
  console.log(`Server started at port ${server.address().port}`);
  dbConnection();
});
