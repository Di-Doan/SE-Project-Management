import pool from '../../utils/mysql.service.js';
import * as courseService from '../../entities/course.service.js';
import * as chatService from '../../entities/chat.service.js';
import * as tutorialService from '../../entities/tutorial.service.js';
import * as teamService from '../../entities/team.service.js';
import * as studentCourseService from '../../entities/student_course.service.js';
import * as studentTutorialService from '../../entities/student_tutorial.service.js';
import * as studentTeamService from '../../entities/student_team.service.js';

export const getCourses = async (req, res) => {
	const { id: studentId } = req.user;

	const courses = await courseService.getCourses({ studentId });
	if (!courses) {
		return res.status(500).json({ message: 'Failed to get courses' });
	}

	return res.status(200).json({ data: courses });
};

export const getCourse = async (req, res) => {
	const { id: studentId } = req.user;
	const { id: courseId } = req.params;

	const course = await courseService.getCourseForStudent(courseId, studentId);
	if (!course) {
		return res.status(500).json({ message: 'Failed to get course' });
	}

	return res.status(200).json({ ...course });
};

export const createCourse = async (req, res) => {
	if (!req.body.name || !req.body.code || !req.body.semesterId) {
		return res.status(400).json({ message: 'Missing course required field' });
	}

	const semester = await semesterService.getSemesterById(req.body.semesterId);
	if (!semester) {
		return res.status(404).json({ message: 'Semester ID not found' });
	}

	const connection = await pool.getConnection();
	await connection.beginTransaction();

	try {
		const announcemenChatId = await chatService.createChat(
			`This is announcement chat for ${req.body.name} course.`,
			connection
		);
		if (!announcemenChatId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create announcement chat' });
		}

		const referenceChatId = await chatService.createChat(
			`This is reference chat for ${req.body.name} course.`,
			connection
		);
		if (!referenceChatId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create reference chat' });
		}

		const course = {
			name: req.body.name,
			code: req.body.code,
			semesterId: req.body.semesterId,
			announcemenChatId,
			referenceChatId,
		};
		const courseId = await courseService.createCourse(course, connection);
		if (!courseId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create course' });
		}

		await connection.commit();
		return res.status(200).json({ id: courseId, ...course });
	} catch (err) {
		console.error('Failed to create course:', err);
		await connection.rollback();
		return res.status(500).json({ message: 'Failed to create course' });
	} finally {
		connection.release();
	}
};

export const createTutorial = async (req, res) => {
	const { id: courseId } = req.params;
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ message: 'Missing tutorial session name' });
	}

	const course = await courseService.getCourseByID(courseId);
	if (!course) {
		return res.status(404).json({ message: 'Course ID not found' });
	}

	const connection = await pool.getConnection();
	await connection.beginTransaction();

	try {
		const chatId = await chatService.createChat(
			`This is tutorial chat for ${name} session.`,
			connection
		);
		if (!chatId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create chat' });
		}

		const tutorial = { name, chatId, courseId };
		const tutorialId = await tutorialService.createTutorial(tutorial, connection);
		if (!tutorialId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create tutorial' });
		}

		await connection.commit();
		return res.status(200).json({ id: tutorialId, ...tutorial });
	} catch (err) {
		console.error('Failed to create tutorial:', err);
		await connection.rollback();
		return res.status(500).json({ message: 'Failed to create tutorial' });
	} finally {
		connection.release();
	}
};

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
