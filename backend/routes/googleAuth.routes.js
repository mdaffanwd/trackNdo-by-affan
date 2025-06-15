import { Router } from 'express'

import { getGoogleAuthLoggedInUser, googleAuthLogin, logoutGoogleAuthUser } from '../controllers/googleAuth.controllers.js';

const router = Router();

// ex:- POST /api/auth/google
router.post('/google', googleAuthLogin)


router.get('/me', getGoogleAuthLoggedInUser)


router.post('/logout', logoutGoogleAuthUser);

const googleAuthRoutes = router
export default googleAuthRoutes;