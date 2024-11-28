const jwt = require("jsonwebtoken");

async function getCurrentUser(req) {
  const userToken = req.cookies.userToken;
  console.log(req.cookies.userAuthTokenuserAuthToken);
  const verifiedToken = await jwt.verify(userToken, process.env.JWT_SECRET);
  return verifiedToken.id;
}

module.exports = { getCurrentUser };
