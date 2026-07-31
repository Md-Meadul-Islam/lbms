import BaseService from "../../../shared/base/BaseService.js";

import ApiError from "../../../shared/errors/ApiError.js";

import ServiceRepository from "../service/service.repository.js";

import ServicePriceRepository from "./servicePrice.repository.js";

import { SERVICE_PRICE_MESSAGES } from "./servicePrice.constants.js";

import { nextServicePriceCode } from "../../sequence/index.js";

class ServicePriceService extends BaseService {
  constructor() {
    super(ServicePriceRepository);
  }
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
        ----------------------------------
        Validate Service
        ----------------------------------
        */

    const service = await ServiceRepository.findById(data.serviceId);

    if (!service) {
      throw new ApiError(
        404,

        SERVICE_PRICE_MESSAGES.INVALID_SERVICE,
      );
    }

    /*
        ----------------------------------
        Validate Date Range
        ----------------------------------
        */

    if (
      data.effectiveTo &&
      new Date(data.effectiveTo) <= new Date(data.effectiveFrom)
    ) {
      throw new ApiError(
        400,

        "Effective To must be greater than Effective From.",
      );
    }

    /*
        ----------------------------------
        Prevent Overlap
        ----------------------------------
        */

    const overlap = await this.repository.hasOverlappingPrice(
      data.businessId,

      data.serviceId,

      new Date(data.effectiveFrom),

      data.effectiveTo ? new Date(data.effectiveTo) : null,
    );

    if (overlap) {
      throw new ApiError(
        409,

        SERVICE_PRICE_MESSAGES.OVERLAPPING_PRICE,
      );
    }

    /*
        ----------------------------------
        Default Price
        ----------------------------------
        */

    if (data.isDefault) {
      await this.repository.clearDefault(
        data.businessId,

        data.serviceId,
      );
    }

    /*
        ----------------------------------
        Generate Code
        ----------------------------------
        */

    data.priceCode = await nextServicePriceCode(data.businessId);

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    const current = await this.findById(id);

    const from = data.effectiveFrom || current.effectiveFrom;

    const to = data.effectiveTo ?? current.effectiveTo;

    if (to && new Date(to) <= new Date(from)) {
      throw new ApiError(
        400,

        "Effective To must be greater than Effective From.",
      );
    }

    const overlap = await this.repository.hasOverlappingPrice(
      current.businessId,

      current.serviceId,

      new Date(from),

      to ? new Date(to) : null,

      id,
    );

    if (overlap) {
      throw new ApiError(
        409,

        SERVICE_PRICE_MESSAGES.OVERLAPPING_PRICE,
      );
    }

    if (data.isDefault === true) {
      await this.repository.clearDefault(
        current.businessId,

        current.serviceId,
      );
    }

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Current Price
    |--------------------------------------------------------------------------
    */

  async getCurrentPrice(businessId, serviceId) {
    return this.repository.getCurrentPrice(
      businessId,

      serviceId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Current Prices
    |--------------------------------------------------------------------------
    */

  async getCurrentPrices(businessId, serviceIds) {
    return this.repository.getCurrentPricesByServiceIds(
      businessId,

      serviceIds,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Price History
    |--------------------------------------------------------------------------
    */

  async getHistory(businessId, serviceId) {
    return this.repository.getHistory(
      businessId,

      serviceId,
    );
  }
}
export default new ServicePriceService();
