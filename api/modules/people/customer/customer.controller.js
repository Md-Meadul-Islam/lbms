import BaseController from "../../../shared/base/BaseController.js";

import CustomerService from "./customer.service.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import { CUSTOMER_MESSAGES } from "./customer.constants.js";

class CustomerController extends BaseController {
  /*
    |--------------------------------------------------------------------------
    | Create Customer
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const payload = {
      ...req.body,
      businessId: req.business._id,
      createdBy: req.user.id,
    };

    const customer = await CustomerService.create(payload);

    return this.created(res, {
      data: customer,
      message: CUSTOMER_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Customer List
    |--------------------------------------------------------------------------
    */

  getAll = asyncHandler(async (req, res) => {
    const customers = await CustomerService.getCustomers(
      req.business._id,
      req.query,
    );

    return this.paginated(res, {
      data: customers.data,
      pagination: customers.pagination,
      message: CUSTOMER_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Customer Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const customer = await CustomerService.findById(req.params.id);

    return this.success(res, {
      data: customer,
      message: CUSTOMER_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update Customer
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const customer = await CustomerService.update(req.params.id, req.body);

    return this.updated(res, {
      data: customer,
      message: CUSTOMER_MESSAGES.UPDATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Delete Customer
    |--------------------------------------------------------------------------
    */

  delete = asyncHandler(async (req, res) => {
    await CustomerService.delete(req.params.id);

    return this.deleted(res, {
      message: CUSTOMER_MESSAGES.DELETED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Search Customer
    |--------------------------------------------------------------------------
    */

  search = asyncHandler(async (req, res) => {
    const customers = await CustomerService.search(
      req.business._id,
      req.query.q || "",
    );

    return this.success(res, {
      data: customers,
      message: CUSTOMER_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Loyalty Points
    |--------------------------------------------------------------------------
    */

  updateLoyalty = asyncHandler(async (req, res) => {
    const customer = await CustomerService.updateLoyalty(
      req.params.id,
      req.body.points,
      req.body.type,
    );

    return this.updated(res, {
      data: customer,
      message: "Loyalty points updated successfully.",
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Last Visit
    |--------------------------------------------------------------------------
    */

  updateLastVisit = asyncHandler(async (req, res) => {
    const customer = await CustomerService.updateLastVisit(req.params.id);

    return this.updated(res, {
      data: customer,
      message: "Customer visit updated successfully.",
    });
  });
}

export default new CustomerController();
