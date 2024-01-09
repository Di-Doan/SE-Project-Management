import pool from "../utils/mysql.service.js";

export const getTeams = async (courseId) => {
  const queryString = `
		SELECT t.team_id, t.team_name, t.team_chat_id, AVG(s.gpa) AS average_gpa, COUNT(s.student_id) AS member_count
		FROM Team AS t
		LEFT JOIN Student_Team AS st ON t.team_id = st.team_id
		LEFT JOIN Student AS s ON st.student_id = s.student_id
		WHERE t.course_id = ${pool.escape(courseId)}
		GROUP BY t.team_id, t.team_name, t.team_chat_id
		ORDER BY case when member_count = t.num_members then 1 else 0 end, member_count DESC
	`;

  try {
    const [results] = await pool.query(queryString);
    return results.map((result) => ({
      id: result.team_id,
      name: result.team_name,
      chatId: result.team_chat_id,
      courseId: result.course_id,
      averageGpa: result.average_gpa,
      memberCount: result.member_count,
    }));
  } catch (err) {
    console.error("Failed to get teams:", err);
    return null;
  }
};

export const getTeamByID = async (teamId) => {
  const queryString = `SELECT * FROM Team WHERE Team.team_id = ${pool.escape(
    teamId
  )}`;

  try {
    const [results] = await pool.query(queryString);
    return results.length > 0
      ? {
          id: results[0].team_id,
          name: results[0].team_name,
          chatId: results[0].chat_id,
          courseId: results[0].course_id,
        }
      : null;
  } catch (err) {
    console.error("Failed to get team by ID:", err);
    return null;
  }
};

export const createTeam = async (team, connection) => {
  const db = connection || pool;
  try {
    const { name, courseId, chatId } = team;

    const [results] = await db.query("INSERT INTO Team SET ?", [
      {
        team_name: name,
        course_id: courseId,
        team_chat_id: chatId,
      },
    ]);

    return results.insertId;
  } catch (err) {
    console.error("Failed to create team:", err);
    return null;
  }
};

export const getTeamIDByCourseAndStudent = async (courseId, studentId) => {
  const queryString = `SELECT  t.team_id 
									FROM Team AS t 
									LEFT JOIN Student_Team AS st ON t.team_id = st.team_id 
									WHERE t.course_id = ${pool.escape(courseId)}
									AND st.student_id = ${pool.escape(studentId)}`;

  try {
    const results = await pool.query(queryString);

    return results[0][0] == null ? 0 : results[0][0].team_id;
  } catch (err) {
    console.error("Failed to get Id:", err);
    return null;
  }
};
