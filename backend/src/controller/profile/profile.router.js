import { Router } from 'express';

import * as profileController from './profile.controller.js';
import { validateAuth } from '../auth/auth.controller.js';

const router = Router();

router.get('/profile', validateAuth, profileController.getProfile);
router.put('/profile', validateAuth, profileController.editProfile);
router.delete('/profile', validateAuth, profileController.deleteProfile);

export default router;
