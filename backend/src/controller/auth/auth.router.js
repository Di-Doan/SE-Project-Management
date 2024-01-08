import { Router } from 'express';

import * as authController from './auth.controller.js';

const router = Router();

router.post('/signup', authController.validateRmitClient, authController.signup);
router.post('/signin', authController.signin);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/renew', authController.renew);
router.post('/signout', authController.signout);

export default router;
