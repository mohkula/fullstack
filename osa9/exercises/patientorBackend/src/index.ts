import express from 'express';
//import axios from 'axios';
import diagnoseRouter from './routes/diagnoses';
const app = express();
import cors from 'cors';

const baseUrl = 'http://localhost:3002/diagnoses';
console.log(baseUrl);

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
const PORT = 3001;




app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);


app.get('/api/diagnoses', (_req, _res) => {
  _res.send('diagnosing');

});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});