require('dotenv').config();
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, `${process.env.ACCESS_SECRET}`, { expiresIn: '24h' });
  },

  generateRefreshToken: (data) => {
    return sign(data, `${process.env.REFRESH_SECRET}`, { expiresIn: '10d' });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie('accessToken', accessToken, {
      domain: 'localhost',
      path: '/',
      sameSite: 'none',
      httpOnly: 'true',
      secure: 'true',
    });
  },

  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      sameSite: 'none',
      secure: 'true',
      httpOnly: 'true',
    });
  },

  checkAccessToken: (req) => {
    const authorization = req;
    if (!authorization) return null;
    const token = authorization;
    if (!token) return null;
    return verify(token, `${process.env.ACCESS_SECRET}`);
  },

  checkRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, `${process.env.REFRESH_SECRET}`);
    } catch (err) {
      return null;
    }
  },

  removeAccessToken: (res) => {
    return res.status(200).clearCookie();
  },

  hashPassword: (password) => {
    return bcrypt.hashSync(password.toString(), 10);
  },

  comparePassword: (loginPassword, databasePassword) => {
    return bcrypt.compareSync(loginPassword, databasePassword);
  },
};
