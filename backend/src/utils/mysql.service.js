import mysql from 'mysql2';

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
});

pool.on('acquire', function (connection) {
	console.log('Connection %d acquired', connection.threadId);
});

const promisePool = pool.promise();

export default promisePool;
