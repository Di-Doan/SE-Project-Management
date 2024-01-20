import pool from '../utils/mysql.service.js';

export const COURSE_STATUS = {
	ACTIVE: 1,
	INACTIVE: 0,
};

export const getCourses = async (filter) => {
	let whereQuery = '';
	if (filter.studentId) {
		whereQuery += `sc.student_id = ${pool.escape(filter.studentId)}`;
	}

	const queryString = `
    SELECT c.course_id, c.course_name, c.course_code, c.status, s.semester_name
    FROM Course AS c
    LEFT JOIN Semester AS s ON c.semester_id = s.semester_id
    ${filter.studentId ? 'LEFT JOIN Student_Course as sc ON sc.course_id = c.course_id' : ''}
    ${whereQuery ? `WHERE ${whereQuery}` : ''}
  `;

	try {
		const [results] = await pool.query(queryString);
		return results.map((e) => ({
			id: e.course_id,
			name: e.course_name,
			code: e.course_code,
			status: e.status,
			semester: e.semester_name,
		}));
	} catch (err) {
		console.error('Failed to get courses:', err);
		return null;
	}
};

export const getCourseByID = async (courseId) => {
	const queryString = `
		SELECT c.course_id, c.course_name, c.course_code, c.status, s.semester_name
		FROM Course AS c
		LEFT JOIN Semester AS s ON c.semester_id = s.semester_id
		WHERE c.course_id = ${pool.escape(courseId)}
	`;

	try {
		const [results] = await pool.query(queryString);
		return results.length > 0
			? {
					id: results[0].couse_id,
					name: results[0].course_name,
					code: results[0].course_code,
					status: results[0].status,
					semester: results[0].semester_name,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get courses:', err);
		return null;
	}
};

export const getCourseForStudent = async (courseId, studentId) => {
	const queryString = `
    SELECT c.course_id, c.course_name, c.course_code, c.status, c.announcement_chat_id, c.reference_chat_id, s.semester_name,
      CAST(CONCAT('[', GROUP_CONCAT(
				DISTINCT JSON_OBJECT('id', tt.tutorial_id, 'name', tt.tutorial_name, 'chatId', tt.tut_chat_id, 'joined', CASE WHEN stt.student_id IS NOT NULL THEN 'True' ELSE 'False' END)
			), ']') AS JSON) as tutorials,
      CAST(CONCAT('[', GROUP_CONCAT(
				DISTINCT JSON_OBJECT('id', t.team_id, 'name', t.team_name, 'chatId', t.team_chat_id, 'joined', CASE WHEN st.student_id IS NOT NULL THEN 'True' ELSE 'False' END)
			), ']') AS JSON) as teams
    FROM Course AS c
    LEFT JOIN Semester AS s 
      ON c.semester_id = s.semester_id
    LEFT JOIN Student_Course AS sc 
      ON c.course_id = sc.course_id AND sc.student_id = ${pool.escape(studentId)}
    LEFT JOIN Tutorial AS tt 
      ON tt.course_id = c.course_id
    LEFT JOIN Student_Tutorial AS stt 
      ON tt.tutorial_id = stt.tutorial_id AND stt.student_id = ${pool.escape(studentId)}
    LEFT JOIN Team AS t 
      ON t.course_id = c.course_id
    LEFT JOIN Student_Team AS st 
      ON st.team_id = t.team_id AND st.student_id = ${pool.escape(studentId)}
    WHERE c.course_id = ${pool.escape(courseId)} AND sc.student_id IS NOT NULL 
      AND c.status = ${pool.escape(COURSE_STATUS.ACTIVE)}
    GROUP BY c.course_id, c.course_name, c.course_code, c.status, c.announcement_chat_id, c.reference_chat_id, s.semester_name
  `;

	try {
		const [results] = await pool.query(queryString, [studentId, studentId, courseId]);
		return results.length > 0
			? {
					id: results[0].couse_id,
					name: results[0].course_name,
					code: results[0].course_code,
					status: results[0].status,
					semester: results[0].semester_name,
					announcemenChatId: results[0].announcement_chat_id,
					referenceChatId: results[0].reference_chat_id,
					tutorials: results[0].tutorials,
					teams: results[0].teams,
			  }
			: null;
	} catch (err) {
		console.error('Failed to get courses:', err);
		return null;
	}
};

export const createCourse = async (course, connection) => {
	const db = connection || pool;
	try {
		const { name, code, semesterId, status, announcemenChatId, referenceChatId } = course;

		const [results] = await db.query('INSERT INTO Course SET ?', [
			{
				course_name: name,
				course_code: code,
				semester_id: semesterId,
				announcement_chat_id: announcemenChatId,
				reference_chat_id: referenceChatId,
				status: status || COURSE_STATUS.ACTIVE,
			},
		]);

		return results.insertId;
	} catch (err) {
		console.error('Failed to create course:', err);
		return null;
	}
};
