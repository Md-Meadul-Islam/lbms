import BaseRepository from "../../../shared/base/BaseRepository.js";

import ServicePrice from "./servicePrice.model.js";

class ServicePriceRepository extends BaseRepository {
  constructor() {
    super(ServicePrice);
  }

  /*
    |--------------------------------------------------------------------------
    | Find Default Price
    |--------------------------------------------------------------------------
    */

  async findDefaultPrice(businessId, serviceId) {
    return this.findOne({
      businessId,

      serviceId,

      isDefault: true,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Current Price
    |--------------------------------------------------------------------------
    */

  async getCurrentPrice(businessId, serviceId) {
    const now = new Date();

    return this.findOne({
      businessId,

      serviceId,

      status: "active",

      effectiveFrom: {
        $lte: now,
      },

      $or: [
        {
          effectiveTo: null,
        },

        {
          effectiveTo: {
            $gte: now,
          },
        },
      ],
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Current Prices
    |--------------------------------------------------------------------------
    */

  async getCurrentPricesByServiceIds(businessId, serviceIds) {
    const now = new Date();

    return this.find({
      businessId,

      serviceId: {
        $in: serviceIds,
      },

      status: "active",

      effectiveFrom: {
        $lte: now,
      },

      $or: [
        {
          effectiveTo: null,
        },

        {
          effectiveTo: {
            $gte: now,
          },
        },
      ],
    });
  }

  /*
    |--------------------------------------------------------------------------
    | History
    |--------------------------------------------------------------------------
    */

  async getHistory(businessId, serviceId) {
    return this.find(
      {
        businessId,

        serviceId,
      },

      {
        sort: {
          effectiveFrom: -1,
        },
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Remove Default
    |--------------------------------------------------------------------------
    */

  async clearDefault(businessId, serviceId) {
    return this.updateMany(
      {
        businessId,

        serviceId,

        isDefault: true,
      },

      {
        isDefault: false,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Check Overlapping Dates
    |--------------------------------------------------------------------------
    */

  async hasOverlappingPrice(businessId, serviceId, from, to, excludeId = null) {
    const filter = {
      businessId,

      serviceId,

      effectiveFrom: {
        $lte: to || new Date("9999-12-31"),
      },

      $or: [
        {
          effectiveTo: null,
        },

        {
          effectiveTo: {
            $gte: from,
          },
        },
      ],
    };

    if (excludeId) {
      filter._id = {
        $ne: excludeId,
      };
    }

    return this.findOne(filter);
  }
}

export default new ServicePriceRepository();
