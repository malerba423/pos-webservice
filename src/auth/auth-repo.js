const db = require('../database');

exports.findUserWithPassword = async ({ user }) => {
  const { email, password } = user;

  const res = await db.raw(
    `
        SELECT id, email, first_name, last_name 
        FROM users WHERE email = :email
        AND password = crypt(:password, password)
      `,
    { email, password },
  );

  return res?.rows?.[0];
};

exports.getUserByEmail = async ({ email }) => {
  const res = await db('users').select('id', 'email', 'first_name', 'last_name').where({ email: email });
  return res?.[0];
};
