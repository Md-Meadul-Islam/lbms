import BaseRepository from "../../shared/base/BaseRepository.js";
import User from "./auth.model.js";

class AuthRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return User.findOne({
      email: email.toLowerCase(),
      isDeleted: false,
    }).select("+password +refreshToken");
  }

  async findPublicProfile(id) {
    return User.findById(id).select("-password -refreshToken");
  }

  async emailExists(email) {
    return User.exists({
      email: email.toLowerCase(),
      isDeleted: false,
    });
  }

  async updateRefreshToken(id, refreshToken) {
    return User.findByIdAndUpdate(
      id,
      {
        refreshToken,
      },
      {
        new: true,
      },
    );
  }

  async updateLastLogin(id) {
    return User.findByIdAndUpdate(id, {
      lastLoginAt: new Date(),
    });
  }

  async changePassword(id, password) {
    return User.findByIdAndUpdate(
      id,
      {
        password,
      },
      {
        new: true,
      },
    );
  }
}

export default new AuthRepository();
