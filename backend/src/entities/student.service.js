import bcrypt from 'bcrypt';
import pool from '../utils/mysql.service.js';
import { removeUndefined } from '../utils/helper.js';

export const STUDENT_STATUS = {
	PENDING: 0,
	ACTIVE: 1,
	INACTIVE: 2,
};

export const getStudentsByFilters = async (filters) => {
	const { studentId, courseId, q, availability, gpa, sameTutorial } = filters;
	try {
		// prettier-ignore
		let queryString = `
			SELECT * FROM Student AS s
			LEFT JOIN Student_Course AS sc 
				ON s.student_id = sc.student_id ${courseId ? `AND sc.course_id = ${pool.escape(courseId)}` : ''}
			${sameTutorial ? 'LEFT JOIN Student_Tutorial AS st ON st.student_id = s.student_id' : ''}
			LEFT JOIN DirectChat AS dc 
				ON (dc.first_std_id = ${pool.escape(studentId)} AND dc.second_std_id = s.student_id) OR (dc.first_std_id = s.student_id AND dc.second_std_id = ${pool.escape(studentId)})
			WHERE s.student_id != ${pool.escape(studentId)}
		`;

		if (q) {
			// prettier-ignore
			queryString += ` AND MATCH (s.rmit_sid, s.fullname, s.email, s.mobile) AGAINST (${pool.escape(q)})`;
		}
		if (availability) {
			queryString += ` AND sc.availability = true`;
		}
		if (sameTutorial) {
			// prettier-ignore
			queryString += ` AND st.tutorial_id = (SELECT tutorial_id FROM Student_Tutorial WHERE student_id = ${pool.escape(studentId)} AND course_id = ${pool.escape(courseId)})`;
		}
		if (gpa) {
			queryString += ` ORDER BY s.gpa DESC`;
		} else {
			queryString += ` ORDER BY dc.chat_id DESC`;
		}

		const [results] = await pool.query(queryString);

		return results.map((result) => ({
			id: result.student_id,
			avatar: result.avatar,
			rmitSID: result.rmit_sid,
			fullname: result.fullname,
			description: result.description,
			email: result.email,
			mobile: result.mobile,
			gpa: result.showGpa ? result.gpa : undefined,
			course: courseId
				? {
						id: result.course_id,
						availability: Boolean(result.availability),
				  }
				: undefined,
		}));
	} catch (err) {
		console.error('Failed to get Students by filters:', err);
		return null;
	}
};

export const getStudentByUsername = async (username) => {
	try {
		const queryString = 'SELECT * FROM Student WHERE Student.email = ? OR Student.rmit_sid = ?';
		const [results] = await pool.query(queryString, [username, username, STUDENT_STATUS.ACTIVE]);

		return results.length > 0
			? {
					id: results[0].student_id,
					rmitSID: results[0].rmit_sid,
					password: results[0].password,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get Student by Username:', err);
		return null;
	}
};

export const getStudentById = async (id, courseId) => {
	try {
		// prettier-ignore
		const queryString = `
			SELECT * FROM Student
			${courseId ? `LEFT JOIN Student_Course ON Student.student_id = Student_Course.student_id AND Student_Course.course_id = ${pool.escape(courseId)}` : ''}
			WHERE Student.student_id = ? AND Student.status = ?
		`;
		const [results] = await pool.query(queryString, [id, STUDENT_STATUS.ACTIVE]);

		return results.length > 0
			? {
					id: results[0].student_id,
					avatar: results[0].avatar,
					rmitSID: results[0].rmit_sid,
					fullname: results[0].fullname,
					description: results[0].description,
					email: results[0].email,
					mobile: results[0].mobile,
					gpa: results[0].gpa,
					showGpa: results[0].showGpa,
					course: courseId
						? {
								id: results[0].course_id,
								availablity: Boolean(results[0].availability),
						  }
						: undefined,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get Student by ID:', err);
		return null;
	}
};

export const createStudent = async (student, connection) => {
	const db = connection || pool;
	try {
		const { sid, fullname, mobile, gpa, email } = student;

		const [results] = await db.query('INSERT INTO Student SET ?', [
			removeUndefined({
				rmit_sid: sid,
				fullname,
				mobile,
				gpa,
				email,
				status: STUDENT_STATUS.PENDING,
			}),
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to add Student:', err);
		return null;
	}
};

export const editStudentById = async (id, student) => {
	try {
		const { password, fullname, mobile, description, showGpa, gpa, status } = student;

		const hashPassword = await (password ? bcrypt.hash(password, 10) : undefined);

		const [results] = await pool.query('UPDATE Student SET ? WHERE student_id = ?', [
			removeUndefined({
				fullname,
				mobile,
				gpa,
				description,
				showGpa,
				status,
				password: hashPassword,
			}),
			id,
		]);

		return results.changedRows;
	} catch (err) {
		console.error('Failed to edit Student:', err);
		return null;
	}
};

export const deleteStudent = async (id) => {
	try {
		const [results] = await pool.query('UPDATE Student SET status = ? WHERE student_id = ?', [
			STUDENT_STATUS.INACTIVE,
			id,
		]);
		return results.changedRows;
	} catch (err) {
		console.error('Failed to delte Student:', err);
		return null;
	}
};
