import pool from '../utils/mysql.service.js';

export const getStudentCourse = async (studentId, courseId) => {
	const queryString = `
		SELECT sc.student_id, sc.course_id, sc.availability
		FROM Student_Course AS sc
		WHERE sc.student_id = ${pool.escape(studentId)} AND sc.course_id = ${pool.escape(courseId)}
	`;

	try {
		const [results] = await pool.query(queryString);
		return results.length > 0 ? results[0] : null;
	} catch (err) {
		console.error('Failed to get student courses:', err);
		return null;
	}
};

export const addStudentCourse = async (studentId, courseId, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query('INSERT INTO Student_Course SET ?', [
			{
				student_id: studentId,
				course_id: courseId,
				availability: true,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to add student course:', err);
		return null;
	}
};

export const removeStudentCourse = async (studentId, courseId, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query(
			'DELETE FROM Student_Course WHERE student_id = ? AND course_id = ?',
			[studentId, courseId]
		);

		return results.affectedRows;
	} catch (err) {
		console.error('Failed to remove student course:', err);
		return null;
	}
};

export const updateAvailability = async (studentId, courseId, availability, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query(
			'UPDATE Student_Course SET availability = ? WHERE student_id = ? AND course_id = ?',
			[availability, studentId, courseId]
		);

		return results.affectedRows;
	} catch (err) {
		console.error('Failed to update student course availability:', err);
		return null;
	}
};
