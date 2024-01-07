import pool from '../utils/mysql.service.js';

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
