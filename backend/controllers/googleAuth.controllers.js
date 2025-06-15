import { OAuth2Client } from 'google-auth-library';

import { generateJWT, verifyJWT } from "../middlewares/jwt.js";
import User from "../models/user.model.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
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
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const { userId } = verifyJWT(token)

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
    })
    .json({ success: true });
}