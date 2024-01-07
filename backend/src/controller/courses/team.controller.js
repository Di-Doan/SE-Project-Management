import pool from '../../utils/mysql.service.js';
import * as teamService from '../../entities/team.service.js';
import * as chatService from '../../entities/chat.service.js';
import * as studentService from '../../entities/student.service.js';
import * as studentTeamService from '../../entities/student_team.service.js';

export const createTeam = async (req, res) => {
	const { id: courseId } = req.params;
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ message: 'Missing team name' });
	}

	const course = await courseService.getCourseByID(courseId);
	if (!course) {
		return res.status(404).json({ message: 'Course ID not found' });
	}

	const connection = await pool.getConnection();
	await connection.beginTransaction();

	try {
		const chatId = await chatService.createChat(`This is team chat for ${name}.`, connection);
		if (!chatId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create chat' });
		}

		const team = { name, chatId, courseId };
		const teamId = await teamService.createTeam(team, connection);
		if (!teamId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create team' });
		}

		await connection.commit();
		return res.status(200).json({ id: teamId, ...team });
	} catch (err) {
		console.error('Failed to create team:', err);
		await connection.rollback();
		return res.status(500).json({ message: 'Failed to create team' });
	} finally {
		connection.release();
	}
};

export const addStudentTeam = async (req, res) => {
	const { id: teamId } = req.params;
	const { id: studentId } = req.user;

	if (!studentId) return res.status(400).json({ message: 'Missing student ID' });

	const teamPromise = teamService.getTeamByID(teamId);
	const studentPromise = studentService.getStudentByID(studentId);
	const studentTeamPromise = studentTeamService.getStudentTeam(studentId, teamId);
	const [team, student, studentTeam] = await Promise.all([
		teamPromise,
		studentPromise,
		studentTeamPromise,
	]);
	if (!team) return res.status(404).json({ message: 'Team ID not found' });
	if (!student) return res.status(404).json({ message: 'Student ID not found' });
	if (studentTeam) return res.status(400).json({ message: 'Student already in team' });

	try {
		const result = studentTeamService.addStudentTeam(studentId, teamId);
		if (!result) {
			return res.status(500).json({ message: 'Failed to add student team' });
		}

		return res.status(200).json({ message: 'Successfully added student team' });
	} catch (err) {
		console.error('Failed to add student team:', err);
		return res.status(500).json({ message: 'Failed to add student team' });
	}
};

export const removeStudentTeam = async (req, res) => {
	const { id: teamId } = req.params;
	const { id: studentId } = req.user;

	if (!studentId) return res.status(400).json({ message: 'Missing student ID' });

	const studentTeam = await studentTeamService.getStudentTeam(studentId, teamId);
	if (!studentTeam) return res.status(404).json({ message: 'Student not in team' });

	try {
		const result = await studentTeamService.removeStudentTeam(studentId, teamId);
		if (!result) {
			return res.status(500).json({ message: 'Failed to remove student team' });
		}

		return res.status(200).json({ message: 'Successfully removed student team' });
	} catch (err) {
		console.error('Failed to remove student team:', err);
		return res.status(500).json({ message: 'Failed to remove student team' });
	}
};
