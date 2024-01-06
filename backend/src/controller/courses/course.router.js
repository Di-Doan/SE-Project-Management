import { Router } from 'express';

import * as courseController from './course.controller.js';
import { validateAuth, validateRmitClient } from '../auth/auth.controller.js';

const router = Router();

router.get('/', validateAuth, courseController.getCourses);
router.get('/:id', validateAuth, courseController.getCourse);

// FOR RMIT CLIENT
router.post('/', validateRmitClient, courseController.createCourse);
// router.post('/:id/students', validateRmitClient, courseController.addCourseStudents);
router.post('/:id/tutorials', validateRmitClient, courseController.createTutorial);
// router.post(
// 	'/:id/tutorials/:tutorial/students',
// 	validateRmitClient,
// 	courseController.addTutorialStudents
// );
router.post('/:id/teams', validateRmitClient, courseController.createTeam);
// router.post('/:id/teams/:teamId/students', validateRmitClient, courseController.addTeamStudents);

export default router;
