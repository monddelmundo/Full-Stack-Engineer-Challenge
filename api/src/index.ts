import 'dotenv/config'
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { resultRouter } from './routers/result.router';
const app = express();
const port = 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/result", resultRouter);


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
