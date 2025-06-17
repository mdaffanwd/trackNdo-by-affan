import { OAuth2Client } from 'google-auth-library';

import { generateJWT, verifyJWT } from "../middlewares/jwt.js";
import User from "../models/user.model.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthSignIn = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    // console.log("🔎 Incoming idToken:", req.body.idToken);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub: googleId, email, name, picture: avatar } = ticket.getPayload();

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({ googleId, email, name, avatar });
    }

    const token = generateJWT({ userId: user._id })

    res
      .cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        // sameSite: 'strict',
        sameSite: 'lax',         // OR 'none' if using secure: true + HTTPS
        // sameSite: 'none',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        user: { email: user.email, name: user.name, avatar: user.avatar }
      });

  } catch (error) {
    next(error);
  }
}

export const getGoogleAuthLoggedInUser = async (req, res, next) => {
  try {

    const { token } = req.cookies;
    // console.log(token)
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const accessToken = verifyJWT(token)
    // bcz, we sending jwt.sign(payload ....) and payload is { userId: user._id } in above CNTRLR
    const userId = accessToken.userId
    // console.log(accessToken.userId)

    const user = await User.findById(userId).lean();
    if (!user) return res.status(401).json({ error: 'User not found' });

    res.json({ user: { email: user.email, name: user.name, avatar: user.avatar } });
  } catch (error) {
    next(error);
  }
}

export const logoutGoogleAuthUser = async (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })
    .json({ success: true });
}