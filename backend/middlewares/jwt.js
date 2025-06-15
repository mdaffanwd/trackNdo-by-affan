export function generateJWT(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyJWT(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}