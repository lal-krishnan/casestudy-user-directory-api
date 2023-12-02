import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import models, { connectDb } from './config/db';
import User from './models/UserModel';
import userRouter from './routes/userRoute';
dotenv.config();
const app = express();
const port = process.env.PORT || 8081;
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);
app.get('/', (req, res) => {
  res.send('Hello world');
});
const dbString=process.env._DB_CONNECTION_STRING || "";
connectDb(dbString).then(async () => {
  console.log("DB connection established");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;