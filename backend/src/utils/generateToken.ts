// import jwt from "jsonwebtoken";

// export const generateToken = (id: string) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || "jwtSecretKey", {
//     expiresIn: "30d",
//   });
// };

// import jwt, { Secret, SignOptions } from "jsonwebtoken";

// export const generateToken = (userId: string): string => {
//   const secret: Secret = process.env.JWT_SECRET as Secret;

//   if (!secret) {
//     throw new Error("JWT_SECRET not found in environment variables");
//   }

//   const options: SignOptions = {
//     expiresIn: (process.env.JWT_EXPIRES as jwt.SignOptions["expiresIn"]) || "1h",
//   };

//   return jwt.sign({ id: userId }, secret, options);
// };

import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET not found in environment variables");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

