import mongoose from "mongoose";

import BaseService from "../../../shared/base/BaseService.js";
import ApiError from "../../../shared/errors/ApiError.js";

import ServiceRepository from "./service.repository.js";
import CategoryRepository from "../category/category.repository.js";
import ServicePriceService from "../service-price/servicePrice.service.js";

import { SERVICE_MESSAGES } from "./service.constants.js";

import { TAX_TYPES, DISCOUNT_TYPES } from "../../../shared/constants/index.js";

import { nextServiceCode } from "../../sequence/index.js";

class ServiceService extends BaseService {
  constructor() {
    super(ServiceRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create Service
    |--------------------------------------------------------------------------
    */

  async create(data) {
    return this.withTransaction(async (session) => {
      data = await this.beforeCreate(data);

      const pricePayload = {
        businessId: data.businessId,

        costPrice: data.costPrice ?? 0,

        sellingPrice: data.sellingPrice,

        taxType: data.taxType,

        taxValue: data.taxValue,

        discountType: data.discountType,

        discountValue: data.discountValue,

        effectiveFrom: new Date(),

        isDefault: true,

        createdBy: data.createdBy,
      };

      delete data.costPrice;
      delete data.sellingPrice;
      delete data.taxType;
      delete data.taxValue;
      delete data.discountType;
      delete data.discountValue;

      const service = await this.repository.create(
        data,

        { session },
      );

      await ServicePriceService.create(
        {
          ...pricePayload,

          serviceId: service._id,
        },

        {
          session,
        },
      );

      return service;
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    /*
        -------------------------------
        Category Exists
        -------------------------------
        */

    const category = await CategoryRepository.findById(data.categoryId);

    if (!category) {
      throw new ApiError(
        404,

        SERVICE_MESSAGES.CATEGORY_NOT_FOUND,
      );
    }

    /*
        -------------------------------
        Duplicate Name
        -------------------------------
        */

    const existingName = await this.repository.findByName(
      data.businessId,

      data.categoryId,

      data.name,
    );

    if (existingName) {
      throw new ApiError(
        409,

        SERVICE_MESSAGES.NAME_EXISTS,
      );
    }

    /*
        -------------------------------
        Generate Service Code
        -------------------------------
        */

    data.serviceCode = await nextServiceCode(data.businessId);

    /*
        -------------------------------
        Slug
        -------------------------------
        */

    if (!data.slug) {
      data.slug = data.name.toLowerCase().trim().replace(/\s+/g, "-");
    }

    /*
        -------------------------------
        Duplicate Slug
        -------------------------------
        */

    const slugExists = await this.repository.findBySlug(
      data.businessId,

      data.slug,
    );

    if (slugExists) {
      throw new ApiError(
        409,

        "Service slug already exists.",
      );
    }

    return data;
  }
  /*
|--------------------------------------------------------------------------
| Update Service
|--------------------------------------------------------------------------
*/

  async update(id, data) {
    data = await this.beforeUpdate(id, data);

    return this.repository.update(id, data);
  }

  /*
|--------------------------------------------------------------------------
| Before Update
|--------------------------------------------------------------------------
*/

  async beforeUpdate(id, data) {
    const service = await this.findById(id);

    if (!service) {
      throw new ApiError(
        404,

        SERVICE_MESSAGES.NOT_FOUND,
      );
    }

    /*
    -----------------------------------
    Validate Category
    -----------------------------------
    */

    if (data.categoryId) {
      const category = await CategoryRepository.findById(data.categoryId);

      if (!category) {
        throw new ApiError(
          404,

          SERVICE_MESSAGES.CATEGORY_NOT_FOUND,
        );
      }
    }

    /*
    -----------------------------------
    Duplicate Name
    -----------------------------------
    */

    if (data.name) {
      const existing = await this.repository.findByName(
        service.businessId,

        data.categoryId || service.categoryId,

        data.name,
      );

      if (existing && existing._id.toString() !== id) {
        throw new ApiError(
          409,

          SERVICE_MESSAGES.NAME_EXISTS,
        );
      }
    }

    /*
    -----------------------------------
    Slug
    -----------------------------------
    */

    if (data.name && !data.slug) {
      data.slug = data.name

        .toLowerCase()

        .trim()

        .replace(/\s+/g, "-");
    }

    if (data.slug) {
      const slugExists = await this.repository.findBySlug(
        service.businessId,

        data.slug,
      );

      if (slugExists && slugExists._id.toString() !== id) {
        throw new ApiError(
          409,

          "Service slug already exists.",
        );
      }
    }

    return data;
  }

  /*
|--------------------------------------------------------------------------
| Get Service
|--------------------------------------------------------------------------
*/

  async findById(id) {
    const service = await this.repository.findById(id);

    if (!service) {
      throw new ApiError(
        404,

        SERVICE_MESSAGES.NOT_FOUND,
      );
    }

    const prices = await ServicePriceService.getCurrentPrices(
      service.businessId,

      [service._id],
    );

    const data = service.toObject ? service.toObject() : service;

    return {
      ...data,

      currentPrice: prices.length ? prices[0] : null,
    };
  }

  /*
|--------------------------------------------------------------------------
| Get All
|--------------------------------------------------------------------------
*/

  async getAll(businessId, query) {
    const filter = {
      businessId,
    };

    if (query.categoryId) {
      filter.categoryId = query.categoryId;
    }

    const services = await this.repository.getServices(
      filter,

      {
        paginate: true,

        page: Number(query.page) || 1,

        limit: Number(query.limit) || 10,
      },
    );

    /*
    ----------------------------------------
    Get Prices
    ----------------------------------------
    */

    const ids = services.data.map((item) => item._id);

    const prices = await ServicePriceService.getCurrentPrices(
      businessId,

      ids,
    );

    /*
    ----------------------------------------
    Create Map
    ----------------------------------------
    */

    const priceMap = new Map();

    prices.forEach((price) => {
      priceMap.set(
        String(price.serviceId),

        price,
      );
    });

    /*
    ----------------------------------------
    Merge
    ----------------------------------------
    */

    services.data = services.data.map((service) => {
      const data = service.toObject ? service.toObject() : service;

      return {
        ...data,

        currentPrice: priceMap.get(String(service._id)) || null,
      };
    });

    return services;
  }

  /*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

  async search(businessId, keyword) {
    const services = await this.repository.search(
      businessId,

      keyword,
    );

    return this.attachPrices(
      businessId,

      services,
    );
  }

  /*
|--------------------------------------------------------------------------
| Category Services
|--------------------------------------------------------------------------
*/

  async getByCategory(businessId, categoryId) {
    const services = await this.repository.findByCategory(
      businessId,

      categoryId,
    );

    return this.attachPrices(
      businessId,

      services,
    );
  }

  /*
|--------------------------------------------------------------------------
| Featured Services
|--------------------------------------------------------------------------
*/

  async getFeatured(businessId) {
    const services = await this.repository.findFeatured(businessId);

    return this.attachPrices(
      businessId,

      services,
    );
  }
  /*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

  async delete(id) {
    const service = await this.findById(id);

    await this.repository.delete(service._id);
  }

  /*
|--------------------------------------------------------------------------
| Attach Current Price
|--------------------------------------------------------------------------
*/

  async attachPrices(businessId, services) {
    if (!services.length) {
      return [];
    }

    const ids = services.map((item) => item._id);

    const prices = await ServicePriceService.getCurrentPrices(
      businessId,

      ids,
    );

    const priceMap = new Map();

    prices.forEach((price) => {
      priceMap.set(
        String(price.serviceId),

        price,
      );
    });

    return services.map((service) => {
      const data = service.toObject ? service.toObject() : service;

      return {
        ...data,

        currentPrice: priceMap.get(String(service._id)) || null,
      };
    });
  }
}

export default new ServiceService();
