const { breweries } = require('../../models');

module.exports = async (req, res) => {
  try {
    const storeInfo = await breweries.findAll();
    res
      .status(200)
      .json({ data: { storeInfo }, message: '브루어리 정보 찾기 성공' });
  } catch (err) {
    res.status(404).json({ message: '존재하지 않는 id입니다' });
  }
};
