import pool from '../utils/mysql.service.js';

export const createChat = async (description, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query('INSERT INTO Chat SET ?', [{ chat_description: description }]);
		return results.insertId;
	} catch (err) {
		console.error('Failed to create chat:', err);
		return null;
	}
};
