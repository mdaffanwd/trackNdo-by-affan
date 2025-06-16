import { Router } from 'express'

import { getGoogleAuthLoggedInUser, googleAuthSignIn, logoutGoogleAuthUser } from '../controllers/googleAuth.controllers.js';

const router = Router();

// ex:- POST /api/auth/google
router.get('/get-current-user', getGoogleAuthLoggedInUser)
router.post('/google-signin', googleAuthSignIn)
router.post('/logout', logoutGoogleAuthUser)

const googleAuthRoutes = router
export default googleAuthRoutes;