import { Router } from 'express';

import * as courseController from './course.controller.js';
import * as tutorialController from './tutorial.controller.js';
import * as teamController from './team.controller.js';
import { validateAuth, validateRmitClient } from '../auth/auth.controller.js';

const router = Router();

router.get('/', validateAuth, courseController.getCourses);
router.get('/:id', validateAuth, courseController.getCourse);
router.get('/:id/students', validateAuth, courseController.getCourseStudents);
router.get('/:id/teams', validateAuth, teamController.getCourseTeams);
router.get("/:id/teamId", validateAuth, teamController.getTeamIdOfStudent);
router.post('/:id/teams/:teamId/students', validateAuth, teamController.addStudentTeam);
router.delete('/:id/teams/:teamId/students', validateAuth, teamController.removeStudentTeam);


// FOR RMIT CLIENT
router.post('/', validateRmitClient, courseController.createCourse);
router.post('/:id/students', validateRmitClient, courseController.addStudentCourse);
router.delete('/:id/students/:studentId', validateRmitClient, courseController.removeStudentCourse);

router.post('/:id/tutorials', validateRmitClient, tutorialController.createTutorial);
router.post(
	'/:id/tutorials/:tutorialId/students',
	validateRmitClient,
	tutorialController.addStudentTutorial
);
router.delete(
	'/:id/tutorials/:tutorialId/students/:studentId',
	validateRmitClient,
	tutorialController.removeStudentTutorial
);

router.post('/:id/teams', validateRmitClient, teamController.createTeam);

export default router;
