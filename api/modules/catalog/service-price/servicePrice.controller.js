import BaseController from "../../../shared/base/BaseController.js";
import { asyncHandler } from "../../../shared/helpers/index.js";

import ServicePriceService from "./servicePrice.service.js";
import { SERVICE_PRICE_MESSAGES } from "./servicePrice.constants.js";

class ServicePriceController extends BaseController {
  constructor() {
    super(ServicePriceService);
  }

  create = asyncHandler(async (req, res) => {
    const price = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: price,

      message: SERVICE_PRICE_MESSAGES.CREATED,
    });
  });

  getHistory = asyncHandler(async (req, res) => {
    const history = await this.service.getHistory(
      req.business._id,

      req.params.serviceId,
    );

    return this.success(res, {
      data: history,

      message: SERVICE_PRICE_MESSAGES.FETCHED,
    });
  });
}

export default new ServicePriceController();
