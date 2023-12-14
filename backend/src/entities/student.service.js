import pool from '../utils/mysql.service.js';

export const STUDENT_STATUS = {
	PENDING: 0,
	ACTIVE: 1,
	INACTIVE: 2,
};

export const getStudentsByFilters = async (filters) => {};

export const getStudentByUsername = async (username) => {
	try {
		const queryString = 'SELECT * FROM Student WHERE Student.email = ? AND Student.status = ?';
		const [results] = await pool.query(queryString, [username, STUDENT_STATUS.ACTIVE]);

		return results.length > 0
			? {
					id: results[0].student_id,
					rmitSID: results[0].rmit_sid,
					passowrd: results[0].password,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get Student by Username:', err);
		return null;
	}
};

export const getStudentById = async (id) => {
	try {
		const queryString = 'SELECT * FROM Student WHERE Student.student_id = ? AND Student.status = ?';
		const [results] = await pool.query(queryString, [id, STUDENT_STATUS.ACTIVE]);

		return results.length > 0
			? {
					id: results[0].student_id,
					rmitSID: results[0].rmit_sid,
					fullname: results[0].fullname,
					email: results[0].email,
					mobile: results[0].mobile,
					messenger: results[0].messenger,
					gpa: results[0].gpa,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get Student by ID:', err);
		return null;
	}
};

export const createStudent = async (student) => {
	try {
		const { sid, fullname, mobile, gpa } = student;

		const [results] = await pool.query('INSERT INTO Student SET ?', [
			{ rmit_sid: sid, fullname, mobile, gpa, status: STUDENT_STATUS.PENDING },
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to add Student:', err);
		return null;
	}
};

export const editStudentById = async (id, student) => {
	try {
		const { password, fullname, email, mobile, messenger, gpa } = student;

		const hashPassword = password ? await bcrypt.hash(password, 10) : undefined;

		const [results] = await pool.query('UPDATE Student SET ? WHERE student_id = ?', [
			{ fullname, mobile, email, messenger, gpa, password: hashPassword },
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