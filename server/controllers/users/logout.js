const { users } = require('../../models');
const { checkAccessToken, removeAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const verify = checkAccessToken(req);
  const { userName, userEmail } = verify;
  if (verify) {
    await users.findOne({
      where: { userEmail, userName },
    });
    removeAccessToken(res).status(200).json({ message: '로그아웃 되었습니다' });
  } else {
    return res.status(400).json({ message: '이미 로그아웃되었습니다' });
  }
};
