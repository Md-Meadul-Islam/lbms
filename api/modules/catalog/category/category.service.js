import slugify from "slugify";

import BaseService from "../../../shared/base/BaseService.js";

import CategoryRepository from "./category.repository.js";

import ApiError from "../../../shared/errors/ApiError.js";

import { CATEGORY_MESSAGES } from "./category.constants.js";

import { nextCategoryCode } from "../../sequence/index.js";

class CategoryService extends BaseService {
  constructor() {
    super(CategoryRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    const slug = slugify(data.name, {
      lower: true,
      strict: true,
    });

    const existsName = await CategoryRepository.findByName(
      data.businessId,
      data.name,
      data.type,
    );

    if (existsName) {
      throw new ApiError(409, CATEGORY_MESSAGES.NAME_EXISTS);
    }

    const existsSlug = await CategoryRepository.findBySlug(
      data.businessId,
      slug,
      data.type,
    );

    if (existsSlug) {
      throw new ApiError(409, CATEGORY_MESSAGES.NAME_EXISTS);
    }

    data.slug = slug;

    data.categoryCode = await nextCategoryCode(data.businessId);

    /*
        -----------------------------
        Parent Category
        -----------------------------
        */

    if (data.parentId) {
      const parent = await this.findById(data.parentId);

      data.level = parent.level + 1;

      data.path = parent.path
        ? `${parent.path}/${parent._id}`
        : parent._id.toString();

      data.ancestors = [...parent.ancestors, parent._id];
    }

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    if (data.name) {
      data.slug = slugify(data.name, {
        lower: true,
        strict: true,
      });
    }

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Category Tree
    |--------------------------------------------------------------------------
    */

  async getTree(businessId, type) {
    const categories = await this.repository.find({
      businessId,

      type,
    });

    const map = {};

    categories.forEach((category) => {
      category = category.toObject();

      category.children = [];

      map[category._id] = category;
    });

    const tree = [];

    categories.forEach((category) => {
      const node = map[category._id];

      if (node.parentId) {
        map[node.parentId]?.children.push(node);
      } else {
        tree.push(node);
      }
    });

    return tree;
  }

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  async search(businessId, keyword, type) {
    return this.repository.search(businessId, keyword, type);
  }

  /*
    |--------------------------------------------------------------------------
    | Featured
    |--------------------------------------------------------------------------
    */

  async featured(businessId, type) {
    return this.repository.featured(businessId, type);
  }

  /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */

  async getCategories(businessId, query) {
    return this.repository.find(
      {
        businessId,

        ...(query.type && {
          type: query.type,
        }),
      },

      {
        paginate: true,

        page: Number(query.page) || 1,

        limit: Number(query.limit) || 10,

        sort: {
          displayOrder: 1,

          createdAt: -1,
        },
      },
    );
  }
}

export default new CategoryService();
