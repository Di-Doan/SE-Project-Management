import {} from 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './src/controller/auth/auth.router.js';
import profileRouter from './src/controller/profile/profile.router.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: `http://localhost:${port}` }));
app.use(helmet());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter); 
// app.use('/courses');
// app.use('/chats');
// app.use('/friends');

app.listen(port, () => console.log(`App running on port ${port}`));
