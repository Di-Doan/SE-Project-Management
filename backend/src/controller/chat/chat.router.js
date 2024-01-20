import { Router } from 'express';

import * as chatController from '../chat/chat.controller.js';
import { validateAuth, validateRmitClient } from '../auth/auth.controller.js';

const router = Router();

router.get('/:id', validateAuth, chatController.getMessageLog);
router.get('/', validateAuth, chatController.getChatsGroup);
router.post('/:id', validateAuth, chatController.postMessage);

export default router;
