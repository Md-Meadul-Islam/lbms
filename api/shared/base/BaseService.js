import mongoose from "mongoose";
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

  async create(data, options = {}) {
    if (this.beforeCreate) {
      data = await this.beforeCreate(data);
    }

    const document = await this.repository.create(
      data,

      options,
    );

    if (this.afterCreate) {
      await this.afterCreate(
        document,

        options,
      );
    }

    return document;
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

  async update(id, data, options = {}) {
    if (this.beforeUpdate) {
      data = await this.beforeUpdate(
        id,

        data,
      );
    }

    const document = await this.repository.update(
      id,

      data,

      options,
    );

    if (this.afterUpdate) {
      await this.afterUpdate(
        document,

        options,
      );
    }

    return document;
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
  async withTransaction(callback) {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const result = await callback(session);

      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();

      throw error;
    } finally {
      session.endSession();
    }
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
