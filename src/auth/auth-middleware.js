const authService = require('./auth-service');

exports.requireAuth = async (req, res, next) => {
  const bearerToken = req.get('Authorization') || '';

  if (!bearerToken.toLowerCase().startsWith('bearer ')) {
    return unauthorized(res);
  }

  const authToken = bearerToken.slice(7, bearerToken.length);

  try {
    const payload = authService.verifyJwt(authToken);
    const user = await authService.getUserByEmail(payload.sub);

    if (!user) {
      return unauthorized(res);
    } else {
      req.user = user;
      return next();
    }
  } catch (error) {
    return unauthorized(res);
  }
};

function unauthorized(res) {
  res.status(401).json({ error: 'Unauthorized request' });
}
