import pool from '../utils/mysql.service.js';

export const getStudentTutorial = async (studentId, tutorialId) => {
	const queryString = `
		SELECT *
		FROM Student_Tutorial
		WHERE student_id = ${pool.escape(studentId)} AND tutorial_id = ${pool.escape(tutorialId)}
	`;

	try {
		const [results] = await pool.query(queryString);
		return results.length > 0 ? results[0] : null;
	} catch (err) {
		console.error('Failed to get student tutorial:', err);
		return null;
	}
};

export const addStudentTutorial = async (studentId, tutorialId, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query('INSERT INTO Student_Tutorial SET ?', [
			{
				student_id: studentId,
				tutorial_id: tutorialId,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to add student tutorial:', err);
		return null;
	}
};

export const removeStudentTutorial = async (studentId, tutorialId, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query(
			'DELETE FROM Student_Tutorial WHERE student_id = ? AND tutorial_id = ?',
			[studentId, tutorialId]
		);

		return results.affectedRows;
	} catch (err) {
		console.error('Failed to remove student tutorial:', err);
		return null;
	}
};
