import pool from '../utils/mysql.service.js';

export const DIRECT_CHAT_STATUS = { ACTIVE: 1, INACTIVE: 0 };

export const getDirectChatByStudentId = async (studentId) => {
	// prettier-ignore
	const queryString = `
    SELECT dc.chat_id, s.student_id, s.rmit_sid, s.fullname, s.email, s.status as friend_status
    FROM DirectChat as dc
    LEFT JOIN Student as s
      ON s.student_id != ${pool.escape(studentId)} AND (dc.first_std_id = s.student_id OR dc.second_std_id = s.student_id)
    WHERE 
      (dc.first_std_id = ${pool.escape(studentId)} OR dc.second_std_id = ${pool.escape(studentId)})
      AND dc.status = ${pool.escape(DIRECT_CHAT_STATUS.ACTIVE)}
  `;

	try {
		const [results] = await pool.query(queryString);
		return results.map((e) => {
			return {
				chatId: e.chat_id,
				friend: {
					id: e.student_id,
					sid: e.rmit_sid,
					fullname: e.fullname,
					email: e.email,
					status: e.friend_status,
				},
			};
		});
	} catch (err) {
		console.error('Failed to get direct chat by student id:', err);
		return null;
	}
};

export const createDirectChat = async (userId, friendId, chatId, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query('INSERT INTO DirectChat SET ?', [
			{
				first_std_id: userId,
				second_std_id: friendId,
				status: DIRECT_CHAT_STATUS.INACTIVE,
				chat_id: chatId,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to create direct chat:', err);
		return null;
	}
};
