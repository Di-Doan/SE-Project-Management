import { Router } from 'express';

import * as courseController from './course.controller.js';
import * as tutorialController from './tutorial.controller.js';
import * as teamController from './team.controller.js';
import { validateAuth, validateRmitClient } from '../auth/auth.controller.js';

const router = Router();

router.get('/', validateAuth, courseController.getCourses);
router.get('/:id', validateAuth, courseController.getCourse);
router.post('/:id/teams/:teamId/students', validateAuth, teamController.addStudentTeam);
router.delete('/:id/teams/:teamId/students', validateAuth, teamController.removeStudentTeam);

// FOR RMIT CLIENT
router.post('/', validateRmitClient, courseController.createCourse);
router.post('/:id/students', validateRmitClient, courseController.addStudentCourse);
router.delete('/:id/students/:studentId', validateRmitClient, courseController.removeStudentCourse);

router.post('/:id/tutorials', validateRmitClient, tutorialController.createTutorial);
router.post(
	'/:id/tutorials/:tutorial/students',
	validateRmitClient,
	tutorialController.addStudentTutorial
);
router.delete(
	'/:id/tutorials/:tutorial/students/:studentId',
	validateRmitClient,
	tutorialController.removeStudentTutorial
);

router.post('/:id/teams', validateRmitClient, teamController.createTeam);

export default router;
