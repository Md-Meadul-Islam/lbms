import BaseRepository from "../../../shared/base/BaseRepository.js";

import ServiceAddonPrice from "./serviceAddonPrice.model.js";

class ServiceAddonPriceRepository extends BaseRepository {
  constructor() {
    super(ServiceAddonPrice);
  }

  /*
    |--------------------------------------------------------------------------
    | Find Default Price
    |--------------------------------------------------------------------------
    */

  async findDefaultPrice(businessId, addonId) {
    return this.findOne({
      businessId,

      addonId,

      isDefault: true,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Current Price
    |--------------------------------------------------------------------------
    */

  async getCurrentPrice(businessId, addonId) {
    const now = new Date();

    return this.findOne({
      businessId,

      addonId,

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
    | Current Prices By AddonIds
    |--------------------------------------------------------------------------
    */

  async getCurrentPricesByAddonIds(businessId, addonIds) {
    const now = new Date();

    return this.find({
      businessId,

      addonId: {
        $in: addonIds,
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
    | Price History
    |--------------------------------------------------------------------------
    */

  async getHistory(businessId, addonId) {
    return this.find(
      {
        businessId,

        addonId,
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
    | Clear Default
    |--------------------------------------------------------------------------
    */

  async clearDefault(businessId, addonId) {
    return this.updateMany(
      {
        businessId,

        addonId,

        isDefault: true,
      },

      {
        isDefault: false,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Overlapping Price Validation
    |--------------------------------------------------------------------------
    */

  async hasOverlappingPrice(businessId, addonId, from, to, excludeId = null) {
    const filter = {
      businessId,

      addonId,

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

  /*
    |--------------------------------------------------------------------------
    | Find By Price Code
    |--------------------------------------------------------------------------
    */

  async findByPriceCode(businessId, priceCode) {
    return this.findOne({
      businessId,

      priceCode,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Latest Price
    |--------------------------------------------------------------------------
    */

  async getLatestPrice(businessId, addonId) {
    return this.findOne(
      {
        businessId,

        addonId,

        status: "active",
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
    | Future Prices
    |--------------------------------------------------------------------------
    */

  async getFuturePrices(businessId, addonId) {
    return this.find(
      {
        businessId,

        addonId,

        effectiveFrom: {
          $gt: new Date(),
        },

        status: "active",
      },

      {
        sort: {
          effectiveFrom: 1,
        },
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Expired Prices
    |--------------------------------------------------------------------------
    */

  async getExpiredPrices(businessId, addonId) {
    return this.find(
      {
        businessId,

        addonId,

        effectiveTo: {
          $lt: new Date(),
        },

        status: "active",
      },

      {
        sort: {
          effectiveTo: -1,
        },
      },
    );
  }
}

export default new ServiceAddonPriceRepository();
