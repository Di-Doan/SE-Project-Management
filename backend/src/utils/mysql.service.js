import mysql from 'mysql2';
import * as fs from 'node:fs/promises';

const DATABASE_INIT_SCRIPT = './src/entities/Web_ChatConnect.sql';
const DATABASE_INIT_MOCK_DATA_SCRIPT = './src/entities/Web_ChatConnect_mock_data.sql';

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DATABASE_URL || '',
	port: process.env.DATABASE_PORT || '',
	user: process.env.DATABASE_USERNAME || '',
	password: process.env.DATABASE_PASSWORD || '',
	database: process.env.DATABASE_NAME || '',
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
	namedPlaceholders: true,
	multipleStatements: true,
});
const promisePool = pool.promise();

async function initDB() {
	// read Web_ChatConnect.sql script
	const initScript = await fs.readFile(DATABASE_INIT_SCRIPT, 'utf-8').catch((err) => {
		console.error('[Initializing database]: ERROR - Failed to read script.\n', err.message);
		return null;
	});
	if (!initScript) return;

	// run Web_ChatConnect.sql script
	const [results] = await promisePool.query(initScript).catch((err) => {
		console.error('[Initializing database]: ERROR - Failed to query script.\n', err);
		return [null];
	});
	if (!results) return;

	console.log('[Initializing database]: SUCCESS - Database initialized!');

	// read Web_ChatConnect_mock_data.sql script
	const mockDataScript = await fs.readFile(DATABASE_INIT_MOCK_DATA_SCRIPT, 'utf-8').catch((err) => {
		console.error('[Initializing mock data]: ERROR - Failed to read script.\n', err.message);
		return null;
	});
	if (!mockDataScript) return;

	// run Web_ChatConnect_mock_data.sql script
	const [finalResults] = await promisePool.query(mockDataScript).catch((err) => {
		console.error('[Initializing mock data]: ERROR - Failed to query script.\n', err);
		return [null];
	});
	if (!finalResults) return;

	console.log('[Initializing mock data]: SUCCESS - Mock data initialized!');
}

pool.on('acquire', function (connection) {
	console.log('Connection %d acquired', connection.threadId);
});

// anything here should only run once
initDB();

export default promisePool;
