import { Router } from 'express';

import * as friendController from './friend.controller.js';
import { validateAuth } from '../auth/auth.controller.js';

const router = Router();

router.get('/', validateAuth, friendController.getDirectChats);
router.post('/', validateAuth, friendController.createDirectChat);

export default router;
