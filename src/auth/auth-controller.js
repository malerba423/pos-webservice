const authService = require('./auth-service');
const config = require('../config');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userObj = {
    email,
    password,
  };

  try {
    const user = await authService.findUserWithPassword({ user: userObj });

    if (!user) {
      return unauthorized(res);
    }

    const authToken = `bearer ${authService.createJwt(user.email, user)}`;

    const data = {
      token: authToken,
      ...user,
    };
    //update socket.io to be "authed"
    //update socket.io to be "authed"
    //update socket.io to be "authed"
    //update socket.io to be "authed"
    //update socket.io to be "authed"

    return res.status(200).json({
      message: 'User logged in successfully',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      //errorCode: errorCodes.Login_FailedToLoginUser,
    });
  }
};

exports.logout = (req, res) => {
  //update socket.io to be "UNauthed"
  //update socket.io to be "UNauthed"
  //update socket.io to be "UNauthed"
  //update socket.io to be "UNauthed"
  //update socket.io to be "UNauthed"

  res.json({
    message: 'Logged out successfully',
  });
};

exports.checkAuth = async function (req, res) {
  return res.status(200).json({
    message: 'User authenticated successfully',
    data: req.user,
  });
};

function unauthorized(res) {
  res.status(401).json({ error: 'Unauthorized request' });
}
