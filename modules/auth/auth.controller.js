import AuthService from "./auth.service.js";

import ApiResponse from "../../shared/responses/ApiResponse.js";

import { asyncHandler } from "../../shared/helpers/index.js";

import { AUTH_MESSAGES } from "./auth.constants.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const result = await AuthService.register(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,

        AUTH_MESSAGES.REGISTER_SUCCESS,

        result,
      ),
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    return res.status(200).json(
      new ApiResponse(
        200,

        AUTH_MESSAGES.LOGIN_SUCCESS,

        result,
      ),
    );
  });

  profile = asyncHandler(async (req, res) => {
    const result = await AuthService.profile(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,

        AUTH_MESSAGES.PROFILE_FETCHED,

        result,
      ),
    );
  });

  changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    await AuthService.changePassword(
      req.user.id,

      currentPassword,

      newPassword,
    );

    return res.status(200).json(
      new ApiResponse(
        200,

        AUTH_MESSAGES.PASSWORD_CHANGED,
      ),
    );
  });
}

export default new AuthController();
