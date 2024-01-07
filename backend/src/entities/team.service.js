import pool from '../utils/mysql.service.js';

export const getTeamByID = async (teamId) => {
	const queryString = `SELECT * FROM Team WHERE Team.team_id = ${pool.escape(teamId)}`;

	try {
		const [results] = await pool.query(queryString);
		return results.length > 0
			? {
					id: results[0].team_id,
					name: results[0].team_name,
					chatId: results[0].chat_id,
					courseId: results[0].course_id,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get team by ID:', err);
		return null;
	}
};

export const createTeam = async (team, connection) => {
	const db = connection || pool;
	try {
		const { name, courseId, chatId } = team;

		const [results] = await db.query('INSERT INTO Team SET ?', [ 
			{
				team_name: name,
				course_id: courseId,
				team_chat_id: chatId,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to create team:', err);
		return null;
	}
};
