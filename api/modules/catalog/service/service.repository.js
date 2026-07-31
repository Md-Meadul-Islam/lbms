import BaseRepository from "../../../shared/base/BaseRepository.js";

import Service from "./service.model.js";

class ServiceRepository extends BaseRepository {
  constructor() {
    super(Service);
  }

  /*
    |--------------------------------------------------------------------------
    | Find by Name
    |--------------------------------------------------------------------------
    */

  async findByName(businessId, categoryId, name) {
    return this.findOne({
      businessId,

      categoryId,

      name,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find by Slug
    |--------------------------------------------------------------------------
    */

  async findBySlug(businessId, slug) {
    return this.findOne({
      businessId,

      slug,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find by Code
    |--------------------------------------------------------------------------
    */

  async findByCode(businessId, serviceCode) {
    return this.findOne({
      businessId,

      serviceCode,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find by Category
    |--------------------------------------------------------------------------
    */

  async findByCategory(businessId, categoryId, options = {}) {
    return this.find(
      {
        businessId,

        categoryId,

        status: "active",
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Featured Services
    |--------------------------------------------------------------------------
    */

  async findFeatured(businessId, options = {}) {
    return this.find(
      {
        businessId,

        isFeatured: true,

        status: "active",
      },

      options,
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
            serviceCode: {
              $regex: keyword,

              $options: "i",
            },
          },
        ],
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | List Services
    |--------------------------------------------------------------------------
    */

  async getServices(filter, options = {}) {
    return this.find(
      filter,

      {
        sort: {
          displayOrder: 1,

          createdAt: -1,
        },

        populate: [
          {
            path: "categoryId",

            select: "categoryCode name color",
          },
        ],

        ...options,
      },
    );
  }
}

export default new ServiceRepository();
