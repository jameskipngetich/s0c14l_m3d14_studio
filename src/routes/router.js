// Contain routes of the app
import { Router } from 'express';
import { home, } from '../controllers/controller.js';

const router = new Router();


router.get('/', home);

export default router;
