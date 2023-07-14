const jwt = require("jsonwebtoken")
function tokenVerification(req, res, next) {
 //pobranie tokenu z nagłówka:
 let token = req.headers["x-access-token"];
 if (!token) {
 res.status(403).send({ message: "No token provided!" });
 }
 //jeśli przesłano token - weryfikacja jego poprawności:
 jwt.verify(token, process.env.JWT_SECRET, (err, decodeduser) => {
 if (err) {
 console.log("Unauthorized!")
 res.status(401).send({ message: "Unauthorized!" });
 }
 console.log("Token poprawny, użytkownik: "+decodeduser._id)
 req.user = decodeduser
 next()
 })
}
module.exports = tokenVerification

// const passport = require('passport');
// const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

// const { User } = require('../models/user');

// passport.use(
//   new JwtStrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//     },
//     async (payload, done) => {
//       try {
//         // Find the user based on the payload
//         const user = await User.findById(payload._id);

//         if (!user) {
//           // User not found
//           return done(null, false);
//         }

//         done(null, user);
//       } catch (err) {
//         done(err, false);
//       }
//     }
//   )
// );


// module.exports = passport.authenticate('jwt', { session: false });