import pool from '../utils/mysql.service.js';

export const getStudentTeam = async (studentId, teamId) => {
	const queryString = `
		SELECT *
		FROM Student_Team
		WHERE student_id = ${pool.escape(studentId)} AND team_id = ${pool.escape(teamId)}
	`;

	try {
		const [results] = await pool.query(queryString);
		return results.length > 0 ? results[0] : null;
	} catch (err) {
		console.error('Failed to get student team:', err);
		return null;
	}
};

export const addStudentTeam = async (studentId, teamId, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query('INSERT INTO Student_Team SET ?', [
			{
				student_id: studentId,
				team_id: teamId,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to add student team:', err);
		return null;
	}
};

export const removeStudentTeam = async (studentId, teamId, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query(
			'DELETE FROM Student_Team WHERE student_id = ? AND team_id = ?',
			[studentId, teamId]
		);

		return results.affectedRows;
	} catch (err) {
		console.error('Failed to remove student team:', err);
		return null;
	}
};
