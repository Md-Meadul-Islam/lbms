import slugify from "slugify";

import BaseService from "../../../shared/base/BaseService.js";

import ApiError from "../../../shared/errors/ApiError.js";

import ServiceRepository from "../service/service.repository.js";

import ServiceAddonRepository from "./serviceAddon.repository.js";

import { SERVICE_ADDON_MESSAGES } from "./serviceAddon.constants.js";

import { nextServiceAddonCode } from "../../sequence/index.js";

class ServiceAddonService extends BaseService {
  constructor() {
    super(ServiceAddonRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  async create(data) {
    return this.withTransaction(async (session) => {
      data = await this.beforeCreate(data);

      return this.repository.create(
        data,

        {
          session,
        },
      );
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    /*
        -------------------------------------------------
        Validate Service
        -------------------------------------------------
        */

    const service = await ServiceRepository.findById(data.serviceId);

    if (!service) {
      throw new ApiError(
        404,

        SERVICE_ADDON_MESSAGES.SERVICE_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Generate Addon Code
        -------------------------------------------------
        */

    data.addonCode = await nextServiceAddonCode(data.businessId);

    /*
        -------------------------------------------------
        Generate Slug
        -------------------------------------------------
        */

    if (!data.slug) {
      data.slug = slugify(
        data.name,

        {
          lower: true,

          strict: true,

          trim: true,
        },
      );
    }

    /*
        -------------------------------------------------
        Duplicate Name
        -------------------------------------------------
        */

    const exists = await this.repository.findByName(
      data.businessId,

      data.serviceId,

      data.name,
    );

    if (exists) {
      throw new ApiError(
        409,

        SERVICE_ADDON_MESSAGES.NAME_EXISTS,
      );
    }

    /*
        -------------------------------------------------
        Duplicate Slug
        -------------------------------------------------
        */

    const slugExists = await this.repository.findBySlug(
      data.businessId,

      data.serviceId,

      data.slug,
    );

    if (slugExists) {
      throw new ApiError(
        409,

        "Addon slug already exists.",
      );
    }

    /*
        -------------------------------------------------
        Default Values
        -------------------------------------------------
        */

    data.displayOrder ??= 0;

    data.allowMultiple ??= false;

    data.maxQuantity ??= 1;

    data.isFeatured ??= false;

    data.isRequired ??= false;

    return data;
  }
  /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    const addon = await this.repository.findById(id);

    if (!addon) {
      throw new ApiError(
        404,

        SERVICE_ADDON_MESSAGES.NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Validate Service
        -------------------------------------------------
        */

    if (data.serviceId) {
      const service = await ServiceRepository.findById(data.serviceId);

      if (!service) {
        throw new ApiError(
          404,

          SERVICE_ADDON_MESSAGES.SERVICE_NOT_FOUND,
        );
      }
    }

    /*
        -------------------------------------------------
        Generate Slug
        -------------------------------------------------
        */

    if (data.name && !data.slug) {
      data.slug = slugify(
        data.name,

        {
          lower: true,

          strict: true,

          trim: true,
        },
      );
    }

    /*
        -------------------------------------------------
        Duplicate Name
        -------------------------------------------------
        */

    if (data.name) {
      const existing = await this.repository.findByName(
        addon.businessId,

        data.serviceId || addon.serviceId,

        data.name,
      );

      if (existing && existing._id.toString() !== id) {
        throw new ApiError(
          409,

          SERVICE_ADDON_MESSAGES.NAME_EXISTS,
        );
      }
    }

    /*
        -------------------------------------------------
        Duplicate Slug
        -------------------------------------------------
        */

    if (data.slug) {
      const slugExists = await this.repository.findBySlug(
        addon.businessId,

        data.serviceId || addon.serviceId,

        data.slug,
      );

      if (slugExists && slugExists._id.toString() !== id) {
        throw new ApiError(
          409,

          "Addon slug already exists.",
        );
      }
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
    const addon = await this.repository.findById(id);

    if (!addon) {
      throw new ApiError(
        404,

        SERVICE_ADDON_MESSAGES.NOT_FOUND,
      );
    }

    return addon;
  }

  /*
    |--------------------------------------------------------------------------
    | Get All
    |--------------------------------------------------------------------------
    */

  async getAll(businessId, query = {}) {
    const filter = {
      businessId,

      status: "active",
    };

    if (query.serviceId) {
      filter.serviceId = query.serviceId;
    }

    if (typeof query.isFeatured !== "undefined") {
      filter.isFeatured = query.isFeatured === "true";
    }

    if (typeof query.isRequired !== "undefined") {
      filter.isRequired = query.isRequired === "true";
    }

    return this.repository.getAddons(
      filter,

      {
        paginate: true,

        page: Number(query.page) || 1,

        limit: Number(query.limit) || 10,
      },
    );
  }
  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  async search(businessId, keyword) {
    return this.repository.search(
      businessId,

      keyword,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Service
    |--------------------------------------------------------------------------
    */

  async getByService(businessId, serviceId) {
    return this.repository.findByService(
      businessId,

      serviceId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get Featured
    |--------------------------------------------------------------------------
    */

  async getFeatured(businessId) {
    return this.repository.findFeatured(businessId);
  }

  /*
    |--------------------------------------------------------------------------
    | Get Required Addons
    |--------------------------------------------------------------------------
    */

  async getRequired(businessId, serviceId) {
    return this.repository.findRequired(
      businessId,

      serviceId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async delete(id, options = {}) {
    const addon = await this.findById(id);

    return this.repository.delete(
      addon._id,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Exists
    |--------------------------------------------------------------------------
    */

  async exists(businessId, serviceId, name) {
    return this.repository.exists(
      businessId,

      serviceId,

      name,
    );
  }
}

export default new ServiceAddonService();
