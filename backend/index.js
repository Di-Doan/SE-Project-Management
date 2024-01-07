import {} from 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './src/controller/auth/auth.router.js';
import profileRouter from './src/controller/profile/profile.router.js';
import friendRouter from './src/controller/friends/friend.router.js';
import courseRouter from './src/controller/courses/course.router.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: `http://localhost:${port}` }));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/courses', courseRouter);
app.use('/api/friends', friendRouter);
// app.use('/api/chats');
app.use('/api/*', (req, res) => res.status(404).json({ message: 'Not found' }));

app.use((req, res) => {
	res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(port, () => console.log(`App running on port ${port}`));
