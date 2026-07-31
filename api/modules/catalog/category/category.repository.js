import BaseRepository from "../../../shared/base/BaseRepository.js";

import Category from "./category.model.js";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }

  async findByName(businessId, name, type) {
    return this.findOne({
      businessId,
      name,
      type,
    });
  }

  async findBySlug(businessId, slug, type) {
    return this.findOne({
      businessId,
      slug,
      type,
    });
  }

  async findByCode(businessId, categoryCode) {
    return this.findOne({
      businessId,
      categoryCode,
    });
  }

  async findByParent(businessId, parentId) {
    return this.find({
      businessId,
      parentId,
    });
  }

  async findRootCategories(businessId, type) {
    return this.find({
      businessId,
      type,
      parentId: null,
    });
  }

  async search(businessId, keyword, type) {
    return this.find({
      businessId,

      type,

      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });
  }

  async featured(businessId, type) {
    return this.find({
      businessId,

      type,

      isFeatured: true,
    });
  }
}

export default new CategoryRepository();
