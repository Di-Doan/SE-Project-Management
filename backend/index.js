import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: `http://localhost:${port}` }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
