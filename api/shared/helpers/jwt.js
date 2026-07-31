import jwt from "jsonwebtoken";

import env from "../../config/env.js";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
/**
 * const token = generateAccessToken({

    id: user._id,

    businessId: user.businessId,

    role: user.role,
});
 */
