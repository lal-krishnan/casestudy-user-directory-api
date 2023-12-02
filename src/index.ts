import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import models, { connectDb } from './config/db';
import User from './models/UserModel';
import userRouter from './routes/userRoute';

const app = express();
const port = 8081;
const eraseDatabaseOnSync = true;
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter);


app.get('/', (req, res) => {
  res.send('Hello world');
});
connectDb().then(async () => {
  console.log("DB connection established");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;