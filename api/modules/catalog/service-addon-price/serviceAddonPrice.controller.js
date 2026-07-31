import BaseController from "../../../shared/base/BaseController.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import ServiceAddonPriceService from "./serviceAddonPrice.service.js";

import { SERVICE_ADDON_PRICE_MESSAGES } from "./serviceAddonPrice.constants.js";

class ServiceAddonPriceController extends BaseController {
  constructor() {
    super(ServiceAddonPriceService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const price = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: price,

      message: SERVICE_ADDON_PRICE_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const price = await this.service.findById(req.params.id);

    return this.success(res, {
      data: price,

      message: SERVICE_ADDON_PRICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Current Price
    |--------------------------------------------------------------------------
    */

  getCurrentPrice = asyncHandler(async (req, res) => {
    const price = await this.service.getCurrentPrice(
      req.business._id,

      req.params.addonId,
    );

    return this.success(res, {
      data: price,

      message: SERVICE_ADDON_PRICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Price History
    |--------------------------------------------------------------------------
    */

  getHistory = asyncHandler(async (req, res) => {
    const prices = await this.service.getHistory(
      req.business._id,

      req.params.addonId,
    );

    return this.success(res, {
      data: prices,

      message: SERVICE_ADDON_PRICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Future Prices
    |--------------------------------------------------------------------------
    */

  getFuturePrices = asyncHandler(async (req, res) => {
    const prices = await this.service.getFuturePrices(
      req.business._id,

      req.params.addonId,
    );

    return this.success(res, {
      data: prices,

      message: SERVICE_ADDON_PRICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Expired Prices
    |--------------------------------------------------------------------------
    */

  getExpiredPrices = asyncHandler(async (req, res) => {
    const prices = await this.service.getExpiredPrices(
      req.business._id,

      req.params.addonId,
    );

    return this.success(res, {
      data: prices,

      message: SERVICE_ADDON_PRICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const price = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: price,

      message: SERVICE_ADDON_PRICE_MESSAGES.UPDATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  delete = asyncHandler(async (req, res) => {
    await this.service.delete(req.params.id);

    return this.deleted(res, {
      message: SERVICE_ADDON_PRICE_MESSAGES.DELETED,
    });
  });
}

export default new ServiceAddonPriceController();
