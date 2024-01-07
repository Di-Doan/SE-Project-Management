import pool from '../../utils/mysql.service.js';
import * as teamService from '../../entities/team.service.js';
import * as chatService from '../../entities/chat.service.js';
import * as studentService from '../../entities/student.service.js';
import * as studentTeamService from '../../entities/student_team.service.js';
import * as studentCourseService from '../../entities/student_course.service.js';
import * as courseService from '../../entities/course.service.js';

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
	const { id: courseId, teamId } = req.params;
	const { id: studentId } = req.user;

	if (!studentId) {
		return res.status(400).json({ message: 'Missing student ID' });
	}

	const teamPromise = teamService.getTeamByID(teamId);
	const studentTeamPromise = studentTeamService.getStudentTeam(studentId, teamId);
	const [team, studentTeam] = await Promise.all([teamPromise, studentTeamPromise]);

	if (!team) {
		return res.status(404).json({ message: 'Team ID not found' });
	}
	if (team.courseId != courseId) {
		return res.status(400).json({ message: 'Team not in course' });
	}
	if (studentTeam) {
		return res.status(400).json({ message: 'Student already in team' });
	}

	const student = await studentService.getStudentById(studentId, team.courseId);
	if (!student) {
		return res.status(404).json({ message: 'Student ID not found' });
	}
	if (!student.course?.id) {
		return res.status(400).json({ message: 'Student not in this course' });
	}
	console.log(student.course);
	if (!student.course?.availablity) {
		return res.status(400).json({ message: 'Student has joined another team in this course' });
	}

	const connection = await pool.getConnection();
	await connection.beginTransaction();

	try {
		const result = studentTeamService.addStudentTeam(studentId, teamId, connection);
		if (result == null) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to add student team' });
		}

		const availability = studentCourseService.updateAvailability(
			studentId,
			team.courseId,
			false,
			connection
		);
		if (!availability) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to update student availability' });
		}

		await connection.commit();
		return res.status(200).json({ studentId, teamId: Number(teamId) });
	} catch (err) {
		console.error('Failed to add student team:', err);
		await connection.rollback();
		return res.status(500).json({ message: 'Failed to add student team' });
	} finally {
		connection.release();
	}
};

export const removeStudentTeam = async (req, res) => {
	const { id: courseId, teamId } = req.params;
	const { id: studentId } = req.user;

	if (!studentId) {
		return res.status(400).json({ message: 'Missing student ID' });
	}

	const studentTeam = await studentTeamService.getStudentTeam(studentId, teamId);
	if (!studentTeam) {
		return res.status(404).json({ message: 'Student not in team' });
	}

	const team = await teamService.getTeamByID(teamId);
	if (!team) {
		return res.status(404).json({ message: 'Team ID not found' });
	}
	if (team.courseId != courseId) {
		return res.status(400).json({ message: 'Team not in course' });
	}

	const connection = await pool.getConnection();
	await connection.beginTransaction();

	try {
		const result = await studentTeamService.removeStudentTeam(studentId, teamId, connection);
		if (!result) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to remove student team' });
		}

		const availability = await studentCourseService.updateAvailability(
			studentId,
			team.courseId,
			true,
			connection
		);
		if (!availability) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to update student availability' });
		}

		await connection.commit();
		return res.status(200).json({ message: 'Successfully removed student team' });
	} catch (err) {
		console.error('Failed to remove student team:', err);
		await connection.rollback();
		return res.status(500).json({ message: 'Failed to remove student team' });
	} finally {
		connection.release();
	}
};
