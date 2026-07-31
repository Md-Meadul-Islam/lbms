import BaseController from "../../../shared/base/BaseController.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import ServiceAssignmentService from "./serviceAssignment.service.js";

import { SERVICE_ASSIGNMENT_MESSAGES } from "./serviceAssignment.constants.js";

class ServiceAssignmentController extends BaseController {
  constructor() {
    super(ServiceAssignmentService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const assignment = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: assignment,

      message: SERVICE_ASSIGNMENT_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Get By Id
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const assignment = await this.service.findById(req.params.id);

    return this.success(res, {
      data: assignment,

      message: SERVICE_ASSIGNMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Employee Assignments
    |--------------------------------------------------------------------------
    */

  getByEmployee = asyncHandler(async (req, res) => {
    const assignments = await this.service.getByEmployee(
      req.business._id,

      req.params.employeeId,

      req.query,
    );

    return this.success(res, {
      data: assignments,

      message: SERVICE_ASSIGNMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Service Assignments
    |--------------------------------------------------------------------------
    */

  getByService = asyncHandler(async (req, res) => {
    const assignments = await this.service.getByService(
      req.business._id,

      req.params.serviceId,

      req.query,
    );

    return this.success(res, {
      data: assignments,

      message: SERVICE_ASSIGNMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Primary Assignment
    |--------------------------------------------------------------------------
    */

  getPrimary = asyncHandler(async (req, res) => {
    const assignment = await this.service.getPrimary(
      req.business._id,

      req.params.serviceId,
    );

    return this.success(res, {
      data: assignment,

      message: SERVICE_ASSIGNMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Online Bookable Employees
    |--------------------------------------------------------------------------
    */

  getOnlineBookable = asyncHandler(async (req, res) => {
    const assignments = await this.service.getOnlineBookable(
      req.business._id,

      req.params.serviceId,
    );

    return this.success(res, {
      data: assignments,

      message: SERVICE_ASSIGNMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  search = asyncHandler(async (req, res) => {
    const assignments = await this.service.search(
      req.business._id,

      req.query.q || "",

      req.query,
    );

    return this.success(res, {
      data: assignments,

      message: SERVICE_ASSIGNMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const assignment = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: assignment,

      message: SERVICE_ASSIGNMENT_MESSAGES.UPDATED,
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
      message: SERVICE_ASSIGNMENT_MESSAGES.DELETED,
    });
  });
}

export default new ServiceAssignmentController();
