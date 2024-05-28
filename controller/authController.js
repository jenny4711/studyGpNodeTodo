const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) throw new Error('No token provided');
    const token = tokenString.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      console.log(payload, 'payload')
      if (error) throw new Error('Invalid token');

      req.userId = payload._id;
      console.log(payload, 'payload'); // 디버그 로그
      next(); // 여기서 next() 호출
    });
  } catch (error) {
    res.status(400).json({ status: 'fail-authenticate', message: error.message });
  }
};

module.exports = authController;