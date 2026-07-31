import BaseController from "../../shared/base/BaseController.js";

import { asyncHandler } from "../../shared/helpers/index.js";

import BusinessService from "./business.service.js";

import { BUSINESS_MESSAGES } from "./business.constants.js";

class BusinessController extends BaseController {
  /*
    |--------------------------------------------------------------------------
    | Create Business
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const payload = {
      ...req.body,
      ownerId: req.user.id,
      createdBy: req.user.id,
    };

    const business = await BusinessService.create(payload);

    return this.created(res, {
      data: business,
      message: BUSINESS_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | My Business
    |--------------------------------------------------------------------------
    */

  getMyBusiness = asyncHandler(async (req, res) => {
    const business = await BusinessService.getMyBusiness(req.user.id);

    return this.success(res, {
      data: business,
      message: BUSINESS_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Get Business By ID
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const business = await BusinessService.getBusiness(req.params.id);

    return this.success(res, {
      data: business,
      message: BUSINESS_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update Business
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const business = await BusinessService.update(req.params.id, req.body);

    return this.updated(res, {
      data: business,
      message: BUSINESS_MESSAGES.UPDATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Replace Enabled Modules
    |--------------------------------------------------------------------------
    */

  updateModules = asyncHandler(async (req, res) => {
    const business = await BusinessService.updateModules(
      req.params.id,
      req.body.enabledModules,
    );

    return this.updated(res, {
      data: business,
      message: BUSINESS_MESSAGES.MODULES_UPDATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Enable Module
    |--------------------------------------------------------------------------
    */

  enableModule = asyncHandler(async (req, res) => {
    const business = await BusinessService.enableModule(
      req.params.id,
      req.params.module,
    );

    return this.updated(res, {
      data: business,
      message: "Module enabled successfully.",
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Disable Module
    |--------------------------------------------------------------------------
    */

  disableModule = asyncHandler(async (req, res) => {
    const business = await BusinessService.disableModule(
      req.params.id,
      req.params.module,
    );

    return this.updated(res, {
      data: business,
      message: "Module disabled successfully.",
    });
  });
}

export default new BusinessController();
