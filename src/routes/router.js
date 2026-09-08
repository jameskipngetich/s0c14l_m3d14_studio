// Contain routes of the app
import { Router } from 'express';
import { home, submitPost } from '../controllers/controller.js';

const router = new Router();


router.get('/', home);

router.post('/socials/postre', submitPost);

export default router;
