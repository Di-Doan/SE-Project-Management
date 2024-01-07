import pool from '../utils/mysql.service.js';

export const getTutorialByID = async (tutorialId) => {
	const queryString = `
		SELECT * FROM Tutorial
		WHERE Tutorial.tutorial_id = ${pool.escape(tutorialId)}
	`;

	try {
		const [results] = await pool.query(queryString); 
		return results.length > 0
			? {
					id: results[0].tutorial_id,
					name: results[0].tutorial_name,
					chatId: results[0].tut_chat_id,
					courseId: results[0].course_id, 
			  }
			: null;
	} catch (err) {
		console.error('Failed to get tutorial by ID:', err);
		return null;
	}
};

export const createTutorial = async (tutorial, connection) => {
	const db = connection || pool;
	try {
		const { name, chatId, courseId } = tutorial;

		const [results] = await db.query('INSERT INTO Tutorial SET ?', [
			{
				tutorial_name: name,
				tut_chat_id: chatId,
				course_id: courseId,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to create tutorial:', err);
		return null;
	}
};
