import { Router } from 'expressjs';

import * as authController from './auth.controller.js';

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password', authController.resetPassword);
router.post('/signout', authController.signout);

router.get('/profile');
router.put('/profile');
router.put('/change-password');

export default router;
