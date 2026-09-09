// Contain routes of the app
import { Router } from 'express';
import { home,
	submitPost,
	viewPosts,
	viewPost,
	updatePost,
			} from '../controllers/controller.js';

const router = new Router();


router.get('/', home);

router.post('/socials/posts', submitPost);

router.get('/socials/posts', viewPosts);

router.get('/socials/posts/:name', viewPost);

router.post('/socials/posts/:name', updatePost);

export default router;
