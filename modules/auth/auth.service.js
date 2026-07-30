import AuthRepository from "./auth.repository.js";

import ApiError from "../../shared/errors/ApiError.js";

import {
  hashPassword,
  comparePassword,
  generateAccessToken,
} from "../../shared/helpers/index.js";

import { AUTH_MESSAGES } from "./auth.constants.js";

import { STATUS } from "../../shared/constants/index.js";

class AuthService {
  async register(payload) {
    const exists = await AuthRepository.emailExists(payload.email);

    if (exists) {
      throw new ApiError(409, AUTH_MESSAGES.USER_ALREADY_EXISTS);
    }

    payload.password = await hashPassword(payload.password);

    const user = await AuthRepository.create(payload);

    const token = generateAccessToken({
      id: user._id,
      businessId: user.businessId,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }

  async login(email, password) {
    const user = await AuthRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const matched = await comparePassword(password, user.password);

    if (!matched) {
      throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    if (user.status !== STATUS.ACTIVE) {
      throw new ApiError(403, AUTH_MESSAGES.ACCOUNT_INACTIVE);
    }

    await AuthRepository.updateLastLogin(user._id);

    const token = generateAccessToken({
      id: user._id,
      businessId: user.businessId,
      role: user.role,
    });

    user.password = undefined;
    user.refreshToken = undefined;

    return {
      user,
      token,
    };
  }

  async profile(userId) {
    const user = await AuthRepository.findPublicProfile(userId);

    if (!user) {
      throw new ApiError(404, AUTH_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await AuthRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, AUTH_MESSAGES.USER_NOT_FOUND);
    }

    const matched = await comparePassword(currentPassword, user.password);

    if (!matched) {
      throw new ApiError(400, AUTH_MESSAGES.PASSWORD_INCORRECT);
    }

    const hashedPassword = await hashPassword(newPassword);

    await AuthRepository.changePassword(userId, hashedPassword);

    return true;
  }
}

export default new AuthService();
