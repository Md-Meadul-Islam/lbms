import BaseService from "../../shared/base/BaseService.js";

import BusinessRepository from "./business.repository.js";

import ApiError from "../../shared/errors/ApiError.js";

import createSlug from "../../shared/helpers/slug.js";

import { DEFAULT_MODULES, BUSINESS_MESSAGES } from "./business.constants.js";

class BusinessService extends BaseService {
  constructor() {
    super(BusinessRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create Business
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    /*
        |-------------------------------------------------------
        | Owner Check
        |-------------------------------------------------------
        */

    const ownerExists = await BusinessRepository.ownerAlreadyHasBusiness(
      data.ownerId,
    );

    if (ownerExists) {
      throw new ApiError(409, BUSINESS_MESSAGES.OWNER_ALREADY_HAS_BUSINESS);
    }

    /*
        |-------------------------------------------------------
        | Generate Slug
        |-------------------------------------------------------
        */

    let slug = createSlug(data.name);

    let counter = 1;

    while (await BusinessRepository.slugExists(slug)) {
      slug = `${createSlug(data.name)}-${counter++}`;
    }

    data.slug = slug;

    /*
        |-------------------------------------------------------
        | Default Modules
        |-------------------------------------------------------
        */

    data.enabledModules = DEFAULT_MODULES[data.businessType] || [];

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Business Profile
    |--------------------------------------------------------------------------
    */

  async getMyBusiness(ownerId) {
    const business = await BusinessRepository.findByOwner(ownerId);

    if (!business) {
      throw new ApiError(404, BUSINESS_MESSAGES.NOT_FOUND);
    }

    return business;
  }

  async getBusiness(id) {
    const business = await BusinessRepository.findBusinessProfile(id);

    if (!business) {
      throw new ApiError(404, BUSINESS_MESSAGES.NOT_FOUND);
    }

    return business;
  }

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    if (data.name) {
      let slug = createSlug(data.name);

      let counter = 1;

      while (await BusinessRepository.slugExists(slug)) {
        const exists = await BusinessRepository.findBySlug(slug);

        if (exists && exists._id.toString() === id) {
          break;
        }

        slug = `${createSlug(data.name)}-${counter++}`;
      }

      data.slug = slug;
    }

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Modules
    |--------------------------------------------------------------------------
    */

  async updateModules(businessId, modules) {
    const business = await this.findById(businessId);

    business.enabledModules = modules;

    await business.save();

    return business;
  }

  async enableModule(businessId, module) {
    const business = await this.findById(businessId);

    if (!business.enabledModules.includes(module)) {
      business.enabledModules.push(module);
    }

    await business.save();

    return business;
  }

  async disableModule(businessId, module) {
    const business = await this.findById(businessId);

    business.enabledModules = business.enabledModules.filter(
      (m) => m !== module,
    );

    await business.save();

    return business;
  }
}

export default new BusinessService();
