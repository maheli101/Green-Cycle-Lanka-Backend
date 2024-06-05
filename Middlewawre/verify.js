// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.headers['x-auth-token'];

//   if (!token) {
//     return res.status(401).json({ message: "You are not authenticated!" });
//   }

//   jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
//     if (err) {
//       return res.status(403).json({ message: "Token is not valid!" });
//     }

//     req.userId = payload.id;
//     req.Driver = payload.Driver;
//     next();
//   });
// };

// module.exports = verifyToken;
