// Contain routes of the app
import { Router } from 'express';
import { home,
	submitPost,
	viewPosts,
	viewPost,
	updatePost,
	registerPlatform,
	viewPlatforms,
	viewPlatform,
	updatePlatform,
	makeVariants,
			} from '../controllers/controller.js';

const router = new Router();


router.get('/', home);

router.post('/socials/posts', submitPost);

router.get('/socials/posts', viewPosts);

router.get('/socials/posts/:name', viewPost);

router.post('/socials/posts/:name', updatePost);

router.post('/socials/platforms', registerPlatform);

router.get('/socials/platforms', viewPlatforms);

router.get('/socials/platforms/:name', viewPlatform);

router.post('/socials/platforms/:name', updatePlatform);

router.post('/socials/makevariants/:name', makeVariants);

export default router;
