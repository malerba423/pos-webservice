const jwt = require('jsonwebtoken');
const authRepo = require('./auth-repo');
const { JWT_SECRET, JWT_ALGORITHM } = require('../config');

exports.findUserWithPassword = async ({ user }) => {
  const userFromDB = await authRepo.findUserWithPassword({ user });
  if (!userFromDB || !userFromDB?.email) {
    return false;
  } else {
    return userFromDB;
  }
};

exports.createJwt = (subject, payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    subject,
    algorithm: JWT_ALGORITHM,
  });
};

exports.verifyJwt = (token) => {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: [JWT_ALGORITHM],
  });
};

exports.getUserByEmail = async (email) => {
  return await authRepo.getUserByEmail({ email: email });
};
