import pool from '../../utils/mysql.service.js';
import * as chatService from '../../entities/chat.service.js';
import * as tutorialService from '../../entities/tutorial.service.js';
import * as studentTutorialService from '../../entities/student_tutorial.service.js';
import * as courseService from '../../entities/course.service.js';
import * as studentService from '../../entities/student.service.js';

export const createTutorial = async (req, res) => {
	const { id: courseId } = req.params;
	console.log(courseId);
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

export const addStudentTutorial = async (req, res) => {
	const { id: courseId, tutorialId } = req.params;
	const { studentId } = req.body;

	if (!studentId) {
		return res.status(400).json({ message: 'Missing student ID' });
	}

	const tutorialPromise = tutorialService.getTutorialByID(tutorialId);
	const studentTutorialPromise = studentTutorialService.getStudentTutorial(studentId, tutorialId);
	const [tutorial, studentTutorial] = await Promise.all([tutorialPromise, studentTutorialPromise]);

	if (!tutorial) {
		return res.status(404).json({ message: 'Tutorial ID not found' });
	}
	if (tutorial.courseId != courseId) {
		return res.status(400).json({ message: 'Tutorial not in course' });
	}
	if (studentTutorial) {
		return res.status(400).json({ message: 'Student already in tutorial' });
	}

	const student = await studentService.getStudentById(studentId, tutorial.courseId);
	if (!student) {
		return res.status(404).json({ message: 'Student ID not found' });
	}
	if (!student.course?.id) {
		return res.status(400).json({ message: 'Student not in this course' });
	}

	try {
		const result = await studentTutorialService.addStudentTutorial(studentId, tutorialId);
		if (result == null) {
			return res.status(500).json({ message: 'Failed to add student tutorial' });
		}

		return res.status(200).json({ studentId, tutorialId: Number(tutorialId) });
	} catch (err) {
		console.error('Failed to add student tutorial:', err);
		return res.status(500).json({ message: 'Failed to add student tutorial' });
	}
};

export const removeStudentTutorial = async (req, res) => {
	const { id: courseId, tutorialId, studentId } = req.params;

	const tutorialPromise = tutorialService.getTutorialByID(tutorialId);
	const studentTutorialPromise = studentTutorialService.getStudentTutorial(studentId, tutorialId);
	const [tutorial, studentTutorial] = await Promise.all([tutorialPromise, studentTutorialPromise]);
	if (!tutorial) {
		return res.status(404).json({ message: 'Tutorial ID not found' });
	}
	if (tutorial.courseId != courseId) {
		return res.status(400).json({ message: 'Tutorial not in course' });
	}
	if (!studentTutorial) {
		return res.status(409).json({ message: 'Student not in tutorial' });
	}

	try {
		const result = await studentTutorialService.removeStudentTutorial(studentId, tutorialId);
		if (!result) {
			return res.status(500).json({ message: 'Failed to remove student tutorial' });
		}

		return res.status(200).json({ message: 'Student removed from tutorial' });
	} catch (err) {
		console.error('Failed to remove student tutorial:', err);
		return res.status(500).json({ message: 'Failed to remove student tutorial' });
	}
};
