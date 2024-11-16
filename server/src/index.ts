import * as express from 'express';
import type { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

import router from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 