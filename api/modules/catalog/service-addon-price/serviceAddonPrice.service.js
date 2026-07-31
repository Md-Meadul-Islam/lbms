import BaseService from "../../../shared/base/BaseService.js";

import ApiError from "../../../shared/errors/ApiError.js";

import ServiceAddonRepository from "../service-addon/serviceAddon.repository.js";

import ServiceAddonPriceRepository from "./serviceAddonPrice.repository.js";

import { SERVICE_ADDON_PRICE_MESSAGES } from "./serviceAddonPrice.constants.js";

import { nextServiceAddonPriceCode } from "../../sequence/index.js";

class ServiceAddonPriceService extends BaseService {
  constructor() {
    super(ServiceAddonPriceRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  async create(data, options = {}) {
    return super.create(
      data,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    /*
        -------------------------------------------------
        Validate Addon
        -------------------------------------------------
        */

    const addon = await ServiceAddonRepository.findById(data.addonId);

    if (!addon) {
      throw new ApiError(
        404,

        SERVICE_ADDON_PRICE_MESSAGES.INVALID_ADDON,
      );
    }

    /*
        -------------------------------------------------
        Validate Date Range
        -------------------------------------------------
        */

    const effectiveFrom = new Date(data.effectiveFrom || new Date());

    const effectiveTo = data.effectiveTo ? new Date(data.effectiveTo) : null;

    if (effectiveTo && effectiveTo <= effectiveFrom) {
      throw new ApiError(
        400,

        "Effective To must be greater than Effective From.",
      );
    }

    /*
        -------------------------------------------------
        Prevent Overlapping Prices
        -------------------------------------------------
        */

    const overlap = await this.repository.hasOverlappingPrice(
      data.businessId,

      data.addonId,

      effectiveFrom,

      effectiveTo,
    );

    if (overlap) {
      throw new ApiError(
        409,

        SERVICE_ADDON_PRICE_MESSAGES.OVERLAPPING_PRICE,
      );
    }

    /*
        -------------------------------------------------
        Default Price Handling
        -------------------------------------------------
        */

    if (data.isDefault) {
      await this.repository.clearDefault(
        data.businessId,

        data.addonId,
      );
    }

    /*
        -------------------------------------------------
        Generate Price Code
        -------------------------------------------------
        */

    data.priceCode = await nextServiceAddonPriceCode(data.businessId);

    /*
        -------------------------------------------------
        Default Values
        -------------------------------------------------
        */

    data.costPrice ??= 0;

    data.taxValue ??= 0;

    data.discountValue ??= 0;

    data.isDefault ??= true;

    data.notes ??= "";

    return data;
  }
  /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    const price = await this.repository.findById(id);

    if (!price) {
      throw new ApiError(
        404,

        SERVICE_ADDON_PRICE_MESSAGES.NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Validate Addon
        -------------------------------------------------
        */

    if (data.addonId) {
      const addon = await ServiceAddonRepository.findById(data.addonId);

      if (!addon) {
        throw new ApiError(
          404,

          SERVICE_ADDON_PRICE_MESSAGES.INVALID_ADDON,
        );
      }
    }

    /*
        -------------------------------------------------
        Effective Dates
        -------------------------------------------------
        */

    const effectiveFrom = data.effectiveFrom
      ? new Date(data.effectiveFrom)
      : price.effectiveFrom;

    const effectiveTo =
      data.effectiveTo !== undefined
        ? data.effectiveTo
          ? new Date(data.effectiveTo)
          : null
        : price.effectiveTo;

    if (effectiveTo && effectiveTo <= effectiveFrom) {
      throw new ApiError(
        400,

        "Effective To must be greater than Effective From.",
      );
    }

    /*
        -------------------------------------------------
        Prevent Overlap
        -------------------------------------------------
        */

    const overlap = await this.repository.hasOverlappingPrice(
      price.businessId,

      data.addonId || price.addonId,

      effectiveFrom,

      effectiveTo,

      id,
    );

    if (overlap) {
      throw new ApiError(
        409,

        SERVICE_ADDON_PRICE_MESSAGES.OVERLAPPING_PRICE,
      );
    }

    /*
        -------------------------------------------------
        Default Price
        -------------------------------------------------
        */

    if (data.isDefault === true) {
      await this.repository.clearDefault(
        price.businessId,

        data.addonId || price.addonId,
      );
    }

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  async update(id, data, options = {}) {
    return super.update(
      id,

      data,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Id
    |--------------------------------------------------------------------------
    */

  async findById(id) {
    const price = await this.repository.findById(id);

    if (!price) {
      throw new ApiError(
        404,

        SERVICE_ADDON_PRICE_MESSAGES.NOT_FOUND,
      );
    }

    return price;
  }

  /*
    |--------------------------------------------------------------------------
    | Current Price
    |--------------------------------------------------------------------------
    */

  async getCurrentPrice(businessId, addonId) {
    return this.repository.getCurrentPrice(
      businessId,

      addonId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Current Prices
    |--------------------------------------------------------------------------
    */

  async getCurrentPrices(businessId, addonIds) {
    return this.repository.getCurrentPricesByAddonIds(
      businessId,

      addonIds,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Price History
    |--------------------------------------------------------------------------
    */

  async getHistory(businessId, addonId) {
    return this.repository.getHistory(
      businessId,

      addonId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Future Prices
    |--------------------------------------------------------------------------
    */

  async getFuturePrices(businessId, addonId) {
    return this.repository.getFuturePrices(
      businessId,

      addonId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Expired Prices
    |--------------------------------------------------------------------------
    */

  async getExpiredPrices(businessId, addonId) {
    return this.repository.getExpiredPrices(
      businessId,

      addonId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async delete(id, options = {}) {
    const price = await this.findById(id);

    return this.repository.delete(
      price._id,

      options,
    );
  }
}

export default new ServiceAddonPriceService();
