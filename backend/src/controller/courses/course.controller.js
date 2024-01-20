import pool from '../../utils/mysql.service.js';
import * as courseService from '../../entities/course.service.js';
import * as chatService from '../../entities/chat.service.js';
import * as studentService from '../../entities/student.service.js';
import * as studentCourseService from '../../entities/student_course.service.js';

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

	// const semester = await semesterService.getSemesterById(req.body.semesterId);
	// if (!semester) {
	// 	return res.status(404).json({ message: 'Semester ID not found' });
	// }

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

export const addStudentCourse = async (req, res) => {
	const { studentId } = req.body;
	const { id: courseId } = req.params;

	const coursePromise = courseService.getCourseByID(courseId);
	const studentPromise = studentService.getStudentById(studentId);
	const studentCoursePromise = studentCourseService.getStudentCourse(studentId, courseId);

	const [course, student, studentCourse] = await Promise.all([
		coursePromise,
		studentPromise,
		studentCoursePromise,
	]);
	if (!course) {
		return res.status(404).json({ message: 'Course ID not found' });
	}
	if (!student) {
		return res.status(404).json({ message: 'Student ID not found' });
	}
	if (studentCourse) {
		return res.status(400).json({ message: 'Student already in this course' });
	}

	try {
		const result = await studentCourseService.addStudentCourse(studentId, courseId);
		if (result == null) {
			return res.status(500).json({ message: 'Failed to add student course' });
		}

		return res.status(200).json({ studentId, courseId: Number(courseId), availability: true });
	} catch (err) {
		console.error('Failed to add student course:', err);
		return res.status(500).json({ message: 'Failed to add student course' });
	}
};

export const removeStudentCourse = async (req, res) => {
	const { id: courseId, studentId } = req.params;

	const studentCourse = await studentCourseService.getStudentCourse(studentId, courseId);
	if (!studentCourse) {
		return res.status(400).json({ message: 'Student not in this course' });
	}

	try {
		const studentCourseId = await studentCourseService.removeStudentCourse(studentId, courseId);
		if (!studentCourseId) {
			return res.status(500).json({ message: 'Failed to remove student course' });
		}

		return res.status(200).json({ id: studentCourseId, studentId, courseId });
	} catch (err) {
		console.error('Failed to remove student course:', err);
		return res.status(500).json({ message: 'Failed to remove student course' });
	}
};

export const getCourseStudents = async (req, res) => {
	const { id: courseId } = req.params;
	const { id: studentId } = req.user;
	const { q, availability, gpa, sameTutorial } = req.query;

	const students = await studentService.getStudentsByFilters({
		studentId,
		courseId,
		q,
		availability,
		gpa,
		sameTutorial,
	});
	if (!students) {
		return res.status(500).json({ message: 'Failed to get students' });
	}


	return res.status(200).json({ data: students });
};
