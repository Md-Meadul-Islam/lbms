import ApiResponse from "../responses/ApiResponse.js";

class BaseController {
  /**
   * Success Response
   */
  success(
    res,
    { data = null, message = "Success", statusCode = 200, meta = {} } = {},
  ) {
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, message, data, meta));
  }

  /**
   * Created Response
   */
  created(res, { data = null, message = "Created successfully." } = {}) {
    return this.success(res, {
      statusCode: 201,
      message,
      data,
    });
  }

  /**
   * Updated Response
   */
  updated(res, { data = null, message = "Updated successfully." } = {}) {
    return this.success(res, {
      statusCode: 200,
      message,
      data,
    });
  }

  /**
   * Deleted Response
   */
  deleted(res, { message = "Deleted successfully." } = {}) {
    return this.success(res, {
      statusCode: 200,
      message,
    });
  }

  /**
   * Paginated Response
   */
  paginated(res, { data, pagination, message = "Success" }) {
    return this.success(res, {
      data,
      meta: pagination,
      message,
    });
  }

  /**
   * No Content
   */
  noContent(res) {
    return res.status(204).send();
  }
}

export default BaseController;
/**
 * import BaseController from "../../shared/base/BaseController.js";

class BusinessController extends BaseController {

    create = asyncHandler(async (req, res) => {

        const business =
            await BusinessService.create(req.body);

        return this.created(res, {
            data: business,
            message: "Business created successfully."
        });

    });

}

export default new BusinessController();
 */
