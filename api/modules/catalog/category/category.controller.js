import BaseController from "../../../shared/base/BaseController.js";

import CategoryService from "./category.service.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import { CATEGORY_MESSAGES } from "./category.constants.js";

class CategoryController extends BaseController {
  constructor() {
    super(CategoryService);
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

    const category = await this.service.create(payload);

    return this.created(res, {
      data: category,

      message: CATEGORY_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */

  getAll = asyncHandler(async (req, res) => {
    const categories = await this.service.getCategories(
      req.business._id,
      req.query,
    );

    return this.paginated(res, {
      data: categories.data,

      pagination: categories.pagination,

      message: CATEGORY_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Tree
    |--------------------------------------------------------------------------
    */

  getTree = asyncHandler(async (req, res) => {
    const tree = await this.service.getTree(
      req.business._id,

      req.query.type,
    );

    return this.success(res, {
      data: tree,

      message: CATEGORY_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  search = asyncHandler(async (req, res) => {
    const categories = await this.service.search(
      req.business._id,

      req.query.q,

      req.query.type,
    );

    return this.success(res, {
      data: categories,

      message: CATEGORY_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Featured
    |--------------------------------------------------------------------------
    */

  featured = asyncHandler(async (req, res) => {
    const categories = await this.service.featured(
      req.business._id,

      req.query.type,
    );

    return this.success(res, {
      data: categories,

      message: CATEGORY_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const category = await this.service.findById(req.params.id);

    return this.success(res, {
      data: category,

      message: CATEGORY_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const category = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: category,

      message: CATEGORY_MESSAGES.UPDATED,
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
      message: CATEGORY_MESSAGES.DELETED,
    });
  });
}

export default new CategoryController();
