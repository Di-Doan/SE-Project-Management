import pool from '../utils/mysql.service.js';

export const createTeam = async (team, connection) => {
	const db = connection || pool;
	try {
		const { name, courseId, chatId } = team;

		const [results] = await db.query('INSERT INTO Team SET ?', [
			{
				team_name: name,
				course_id: courseId,
				chat_id: chatId,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to create team:', err);
		return null;
	}
};
