import BaseController from "../../../shared/base/BaseController.js";

import EmployeeService from "./employee.service.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import { EMPLOYEE_MESSAGES } from "./employee.constants.js";

class EmployeeController extends BaseController {
  /*
    |--------------------------------------------------------------------------
    | Create Employee
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const payload = {
      ...req.body,
      businessId: req.business._id,
      createdBy: req.user.id,
    };

    const employee = await EmployeeService.create(payload);

    return this.created(res, {
      data: employee,
      message: EMPLOYEE_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Get Employees
    |--------------------------------------------------------------------------
    */

  getAll = asyncHandler(async (req, res) => {
    const result = await EmployeeService.getEmployees(
      req.business._id,
      req.query,
    );

    return this.paginated(res, {
      data: result.data,
      pagination: result.pagination,
      message: EMPLOYEE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Get Employee
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const employee = await EmployeeService.getEmployee(req.params.id);

    return this.success(res, {
      data: employee,
      message: EMPLOYEE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update Employee
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const employee = await EmployeeService.update(req.params.id, req.body);

    return this.updated(res, {
      data: employee,
      message: EMPLOYEE_MESSAGES.UPDATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Delete Employee
    |--------------------------------------------------------------------------
    */

  delete = asyncHandler(async (req, res) => {
    await EmployeeService.delete(req.params.id);

    return this.deleted(res, {
      message: EMPLOYEE_MESSAGES.DELETED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Change Status
    |--------------------------------------------------------------------------
    */

  changeStatus = asyncHandler(async (req, res) => {
    const employee = await EmployeeService.changeStatus(
      req.params.id,
      req.body.status,
    );

    return this.updated(res, {
      data: employee,
      message: "Employee status updated successfully.",
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Reset Password
    |--------------------------------------------------------------------------
    */

  resetPassword = asyncHandler(async (req, res) => {
    await EmployeeService.resetPassword(req.params.id, req.body.password);

    return this.updated(res, {
      message: EMPLOYEE_MESSAGES.PASSWORD_RESET,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | My Profile
    |--------------------------------------------------------------------------
    */

  me = asyncHandler(async (req, res) => {
    const employee = await EmployeeService.getEmployee(req.user.employeeId);

    return this.success(res, {
      data: employee,
      message: EMPLOYEE_MESSAGES.FETCHED,
    });
  });
}

export default new EmployeeController();
