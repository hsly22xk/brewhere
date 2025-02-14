const { users } = require('../../models');
const checkTokens = require('../auth');

module.exports = async (req, res) => {
  const userInfo = checkTokens(req);
  if (!userInfo) {
    res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    try {
      await users.destroy({
        where: { userEmail: userInfo.userEmail },
      });
      return res
        .clearCookie('accessToken', {
          httpOnly: 'true',
          sameSite: 'none',
          secure: 'true',
        })
        .status(204)
        .json({ message: '탈퇴가 완료되었습니다' });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다' });
    }
  }
};
