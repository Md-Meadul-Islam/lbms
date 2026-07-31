import BaseController from "../../../shared/base/BaseController.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import ServiceService from "./service.service.js";

import { SERVICE_MESSAGES } from "./service.constants.js";

class ServiceController extends BaseController {
  constructor() {
    super(ServiceService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const payload = {
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    };

    const service = await this.service.create(payload);

    return this.created(res, {
      data: service,

      message: SERVICE_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */

  getAll = asyncHandler(async (req, res) => {
    const services = await this.service.getAll(
      req.business._id,

      req.query,
    );

    return this.paginated(res, {
      data: services.data,

      pagination: services.pagination,

      message: SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const service = await this.service.findById(req.params.id);

    return this.success(res, {
      data: service,

      message: SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  search = asyncHandler(async (req, res) => {
    const services = await this.service.search(
      req.business._id,

      req.query.q || "",
    );

    return this.success(res, {
      data: services,

      message: SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Category Services
    |--------------------------------------------------------------------------
    */

  getByCategory = asyncHandler(async (req, res) => {
    const services = await this.service.getByCategory(
      req.business._id,

      req.params.categoryId,
    );

    return this.success(res, {
      data: services,

      message: SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Featured Services
    |--------------------------------------------------------------------------
    */

  getFeatured = asyncHandler(async (req, res) => {
    const services = await this.service.getFeatured(req.business._id);

    return this.success(res, {
      data: services,

      message: SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const service = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: service,

      message: SERVICE_MESSAGES.UPDATED,
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
      message: SERVICE_MESSAGES.DELETED,
    });
  });
}

export default new ServiceController();
