import jwt  from "jsonwebtoken";
import 'dotenv/config';
import generalResponse from "../helpers/generalResponse.js";

const secretKey = process.env.JWT_SECRET_TOKEN;


//Create token for Signup user
export const createTokenForSignup = async (user) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
      return resolve(token);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

//for validation of the token
export const validateToken = async (req, res, next) => {
  const token = req.headers.authorization; 
  if (!token) {
    return res.status(400).json(generalResponse("your session has been expired"));
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {    
    return res.status(400).json(generalResponse("your session has been expired"));
    }
    next();
  });
};

//for extracting data from token
export const getDataFromToken = async(token)=>{
  try {
    return jwt.verify(token,secretKey);
  } catch (error) {
    console.log(error);
    return error;
  }
  }
//create token for dashboard

export const createTokenForDashboard = async (user) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
      return resolve(token);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};
export const createTokenForadmin = async (user) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
      return resolve(token);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};
// exports.createTokenForLogin = async (user) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
//       return resolve(token);
//     } catch (error) {
//       console.log(error);
//       return reject(error);
//     }
//   });
// };

// exports.validateEmailToken = async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.json(
//         generalResponse(
//           0,
//           "your session for creating password has been expired"
//         )
//       );
//     }
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         return res.json(
//           generalResponse(
//             0,
//             "your session for creating password has been expired"
//           )
//         );
//       } else {
//         return res.json(generalResponse(1, "Valid Token"));
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.validateToken = async (req, res, next) => {
//   const token = req.headers.authorization; 
//   if (!token) {
//     return res.json(generalResponse(0, "your session has been expired"));
//   }
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {    
//       return res.json(generalResponse(0, "your session has been expired"));
//     }
//     next();
//   });
// };

// exports.getDataFromToken = async(token)=>{
// try {
//   return jwt.verify(token,secretKey);
// } catch (error) {
//   console.log(error);
//   return error;
// }
// }