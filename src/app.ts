import express, { Express } from "express";
import config from "config"
import connectDB from './utils/connect'
import log from './utils/logger'
import routes from './utils/route'
let port = config.get<number>('Customer.port')
let app = express();
app.listen(port, async () => {
  log.info(`app is running on port : ${port}!!!`);
  await connectDB()
  routes(app)
});