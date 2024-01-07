import mysql from 'mysql2';
import fs  from 'fs';
import bcrypt from 'bcrypt';

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
	multipleStatements: true
});

function initDB () {
	pool.query(`
		DROP DATABASE IF EXISTS Web_ChatConnect;
		CREATE DATABASE Web_ChatConnect;
	`, (err) => {
		if (err) {
			console.error('[Initializing database]: ERROR - Failed to drop database.\n', err.message);
			return;
		}
		
		console.log('[Initializing database]: SUCCESS - Database cleaned!');
	})
	fs.readFile(DATABASE_INIT_SCRIPT, 'utf-8', (err, data) => {	// read Web_ChatConnect.sql script
		if (err) {
			console.error('[Initializing database]: ERROR - Failed to read script.\n', err.message);
			return;
		}
		
		pool.query(data, (err) => {	// run Web_ChatConnect.sql script
			if (err) {
				console.error('[Initializing database]: ERROR - Failed to query script.\n', err.message);
				return;
			}
			
			console.log('[Initializing database]: SUCCESS - Database initialized!');

			fs.readFile(DATABASE_INIT_MOCK_DATA_SCRIPT, 'utf-8', (err, data) => {	// read Web_ChatConnect_mock_data.sql script
				if (err) {
					console.error('[Initializing mock data]: ERROR - Failed to read script.\n', err.message);
					return;
				}
				
				pool.query(data, (err) => {	// run Web_ChatConnect_mock_data.sql script
					if (err) {
						console.error('[Initializing mock data]: ERROR - Failed to query script.\n', err.message);
						return;
					}

					console.log('[Initializing mock data]: SUCCESS - Mock data partialy initialized!.')
					
					// need one more pool.query() to fix user password (currently not hashed)
					pool.query('SELECT student_id, password FROM Student', (err, data) => {
						if (err) {
							console.error('[Initializing mock data]: ERROR - Failed to query students.\n', err.message);
							return;
						}
						
						data.forEach((student) => {
							bcrypt.hash('password', 10, (err, hashedPassword) => {
								if (err) {
									console.error('[Initializing mock data]: ERROR - Failed to rehash passwords.\n', err.message);
									return;
								}

								pool.query('UPDATE Student SET password = ? WHERE student_id = ?', [hashedPassword, student.student_id], (err) => {
									if (err) {
										console.error('[Initializing mock data]: ERROR - Failed to update passwords.\n', err.message);
										return;
									}
								});
							});
						});
						console.log('[Initializing mock data]: SUCCESS - Update all student password!');
						// TO DO: create data for teams (assignment team/group) - direct chat relationship - message (maybe?)
						// add below this line

						console.log('[Initializing mock data]: SUCCESS - Mock data initialized!');
					});
				});
			});
		});
	});
}

pool.on('acquire', function (connection) {
	console.log('Connection %d acquired', connection.threadId);
});

// anything here should only run once
(() => {
	initDB();
})();

const promisePool = pool.promise();

export default promisePool;
