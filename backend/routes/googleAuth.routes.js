import { Router } from 'express'

import { getGoogleAuthLoggedInUser, googleAuthLogin, logoutGoogleAuthUser } from '../controllers/googleAuth.controllers.js';

const router = Router();

// ex:- POST /api/auth/google
router.get('/', getGoogleAuthLoggedInUser)
router.post('/', googleAuthLogin)
router.post('/logout', logoutGoogleAuthUser )


router.post('/logout', logoutGoogleAuthUser);

const googleAuthRoutes = router
export default googleAuthRoutes;