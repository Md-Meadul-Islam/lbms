import BaseRepository from "../../../shared/base/BaseRepository.js";

import ServiceAddon from "./serviceAddon.model.js";

class ServiceAddonRepository extends BaseRepository {
  constructor() {
    super(ServiceAddon);
  }

  /*
    |--------------------------------------------------------------------------
    | Find by Name
    |--------------------------------------------------------------------------
    */

  async findByName(businessId, serviceId, name) {
    return this.findOne({
      businessId,

      serviceId,

      name,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find by Slug
    |--------------------------------------------------------------------------
    */

  async findBySlug(businessId, serviceId, slug) {
    return this.findOne({
      businessId,

      serviceId,

      slug,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find by Code
    |--------------------------------------------------------------------------
    */

  async findByCode(businessId, addonCode) {
    return this.findOne({
      businessId,

      addonCode,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Service
    |--------------------------------------------------------------------------
    */

  async findByService(businessId, serviceId, options = {}) {
    return this.find(
      {
        businessId,

        serviceId,

        status: "active",
      },

      {
        sort: {
          displayOrder: 1,

          createdAt: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Featured Addons
    |--------------------------------------------------------------------------
    */

  async findFeatured(businessId, options = {}) {
    return this.find(
      {
        businessId,

        isFeatured: true,

        status: "active",
      },

      {
        sort: {
          displayOrder: 1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Required Addons
    |--------------------------------------------------------------------------
    */

  async findRequired(businessId, serviceId) {
    return this.find(
      {
        businessId,

        serviceId,

        isRequired: true,

        status: "active",
      },

      {
        sort: {
          displayOrder: 1,
        },
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  async search(businessId, keyword, options = {}) {
    return this.find(
      {
        businessId,

        status: "active",

        $or: [
          {
            name: {
              $regex: keyword,

              $options: "i",
            },
          },

          {
            description: {
              $regex: keyword,

              $options: "i",
            },
          },

          {
            addonCode: {
              $regex: keyword,

              $options: "i",
            },
          },
        ],
      },

      {
        sort: {
          displayOrder: 1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | List Addons
    |--------------------------------------------------------------------------
    */

  async getAddons(filter, options = {}) {
    return this.find(
      filter,

      {
        sort: {
          displayOrder: 1,

          createdAt: -1,
        },

        populate: [
          {
            path: "serviceId",

            select: "serviceCode name",
          },
        ],

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Exists
    |--------------------------------------------------------------------------
    */

  async exists(businessId, serviceId, name) {
    const addon = await this.findByName(
      businessId,

      serviceId,

      name,
    );

    return !!addon;
  }
}

export default new ServiceAddonRepository();
