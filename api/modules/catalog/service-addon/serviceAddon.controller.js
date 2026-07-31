import BaseController from "../../../shared/base/BaseController.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import ServiceAddonService from "./serviceAddon.service.js";

import { SERVICE_ADDON_MESSAGES } from "./serviceAddon.constants.js";

class ServiceAddonController extends BaseController {
  constructor() {
    super(ServiceAddonService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const addon = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: addon,

      message: SERVICE_ADDON_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */

  getAll = asyncHandler(async (req, res) => {
    const addons = await this.service.getAll(
      req.business._id,

      req.query,
    );

    return this.paginated(res, {
      data: addons.data,

      pagination: addons.pagination,

      message: SERVICE_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const addon = await this.service.findById(req.params.id);

    return this.success(res, {
      data: addon,

      message: SERVICE_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  search = asyncHandler(async (req, res) => {
    const addons = await this.service.search(
      req.business._id,

      req.query.q || "",
    );

    return this.success(res, {
      data: addons,

      message: SERVICE_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Get By Service
    |--------------------------------------------------------------------------
    */

  getByService = asyncHandler(async (req, res) => {
    const addons = await this.service.getByService(
      req.business._id,

      req.params.serviceId,
    );

    return this.success(res, {
      data: addons,

      message: SERVICE_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Featured
    |--------------------------------------------------------------------------
    */

  getFeatured = asyncHandler(async (req, res) => {
    const addons = await this.service.getFeatured(req.business._id);

    return this.success(res, {
      data: addons,

      message: SERVICE_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Required
    |--------------------------------------------------------------------------
    */

  getRequired = asyncHandler(async (req, res) => {
    const addons = await this.service.getRequired(
      req.business._id,

      req.params.serviceId,
    );

    return this.success(res, {
      data: addons,

      message: SERVICE_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const addon = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: addon,

      message: SERVICE_ADDON_MESSAGES.UPDATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  delete = asyncHandler(async (req, res) => {
    await this.service.delete(req.params.id);

    return this.deleted(res, {
      message: SERVICE_ADDON_MESSAGES.DELETED,
    });
  });
}

export default new ServiceAddonController();
