import ApiError from "../errors/ApiError.js";

class BaseService {
  constructor(repository) {
    if (!repository) {
      throw new Error("Repository is required.");
    }

    this.repository = repository;
  }

  /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    return data;
  }

  async afterCreate(data) {
    return data;
  }

  async beforeUpdate(id, data) {
    return data;
  }

  async afterUpdate(data) {
    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */

  async create(data) {
    data = await this.beforeCreate(data);

    const result = await this.repository.create(data);

    return this.afterCreate(result);
  }

  async findById(id, options = {}) {
    const item = await this.repository.findById(id, options);

    if (!item) {
      throw new ApiError(404, "Resource not found.");
    }

    return item;
  }

  async findOne(filter, options = {}) {
    return this.repository.findOne(filter, options);
  }

  async find(filter = {}, options = {}) {
    return this.repository.find(filter, options);
  }

  async update(id, data) {
    data = await this.beforeUpdate(id, data);

    const result = await this.repository.updateById(id, data);

    if (!result) {
      throw new ApiError(404, "Resource not found.");
    }

    return this.afterUpdate(result);
  }

  async delete(id) {
    const exists = await this.repository.findById(id);

    if (!exists) {
      throw new ApiError(404, "Resource not found.");
    }

    return this.repository.softDelete(id);
  }

  async restore(id) {
    const exists = await this.repository.findById(id, {
      includeDeleted: true,
    });

    if (!exists) {
      throw new ApiError(404, "Resource not found.");
    }

    return this.repository.restore(id);
  }

  async count(filter = {}) {
    return this.repository.count(filter);
  }
}
export default BaseService;
/**
 * class BusinessService extends BaseService {

    async beforeCreate(data){

        data.slug =
            createSlug(data.name);

        return data;

    }

}
    async beforeCreate(data){

    const exists =
        await this.repository.exists({

            name:data.name,

            businessId:data.businessId

        });

    if(exists){

        throw new ApiError(
            409,
            "Service already exists."
        );

    }

    return data;

}
 */
