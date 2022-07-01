const { users } = require('../../models');

module.exports = async (req, res) => {
  const { userEmail } = req.body;
  if (!userEmail) {
    res.status(400).json({ message: '잘못된 요청입니다' });
  } else {
    const reduplicatedEmail = await users.findOne({
      where: { userEmail },
    });
    if (reduplicatedEmail) {
      res.status(409).json({ message: '이미 등록된 이메일입니다' });
    } else {
      res.status(200).json({
        data: { userEmail },
        message: '사용 가능한 이메일 주소입니다',
      });
    }
  }
};
