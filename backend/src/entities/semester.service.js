import pool from '../utils/mysql.service.js';
import { removeUndefined } from '../utils/helper.js';

export const SEMESTER_STATUS = { ACTIVE: 1, INACTIVE: 0 };

export const getSemesterById = async (id) => {
	try {
		const [results] = await pool.query('SELECT * FROM Semester WHERE semester_id = ?', [id]);
		return results.length > 0
			? {
					id: results[0].semester_id,
					name: results[0].semester_name,
					startDate: results[0].start_date,
					endDate: results[0].end_date,
					status: results[0].status,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get semester by id:', err);
		return null;
	}
};

export const createSemester = async (semester) => {
	try {
		const { name, startDate, endDate, status } = semester;

		const [results] = await pool.query('INSERT INTO Semester SET ?', [
			{
				semester_name: name,
				start_date: startDate,
				end_date: endDate,
				status: status || SEMESTER_STATUS.ACTIVE,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to create semester:', err);
		return null;
	}
};

export const editSemester = async (id, semester) => {
	try {
		const { name, startDate, endDate, status } = semester;

		const [results] = await pool.query('UPDATE Semester SET ? WHERE semester_id = ?', [
			removeUndefined({ semester_name: name, start_date: startDate, end_date: endDate, status }),
			id,
		]);

		return results.affectedRows > 0;
	} catch (err) {
		console.error('Failed to edit semester:', err);
		return null;
	}
};
