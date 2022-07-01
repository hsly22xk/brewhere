const { users } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  comparePassword,
} = require('../../controllers/tokenFunctions');

module.exports = async (req, res) => {
  const { userEmail, password } = req.body;
  if (!userEmail) {
    return res.status(400).json({ message: '이메일 주소를 확인해주세요' });
  } else if (!password) {
    return res.status(400).json({ message: '비밀번호를 확인해주세요' });
  } else {
    try {
      const userInfo = await users.findOne({
        where: { userEmail },
      });
      if (!userInfo) {
        return res.status(409).json({ message: '존재하지 않는 사용자입니다' });
      } else {
        const comparedPassword = comparePassword(password, userInfo.password);
        if (!comparedPassword) {
          return res
            .status(401)
            .json({ message: '올바른 비밀번호가 아닙니다' });
        } else {
          delete userInfo.dataValues.password;
          const accessToken = generateAccessToken(userInfo.dataValues);
          const refreshToken = generateRefreshToken(userInfo.dataValues);
          sendAccessToken(res, accessToken);
          sendRefreshToken(res, refreshToken);
          return res
            .status(200)
            .json({
              data: { accessToken },
              message: '로그인에 성공하였습니다',
            });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
};
