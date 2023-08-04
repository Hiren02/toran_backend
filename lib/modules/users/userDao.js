let BaseDao = require("../../dao/BaseDao");

const User = require("../../modal/user");
const userDao = new BaseDao(User);

function getDetails(details) {
  return userDao.find(details);
}

module.exports = {
  getDetails
};
