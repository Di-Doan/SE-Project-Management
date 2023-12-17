import { Router } from 'express';

import * as profileController from './profile.controller.js';
import { validateAuth } from '../auth/auth.controller.js';

const router = Router();

router.get('/', validateAuth, profileController.getProfile);
router.put('/', validateAuth, profileController.editProfile);
router.delete('/', validateAuth, profileController.deleteProfile);

export default router;
