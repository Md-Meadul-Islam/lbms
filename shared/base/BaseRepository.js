import mongoose from "mongoose";

class BaseRepository {
  constructor(model) {
    if (!model) {
      throw new Error("Model is required.");
    }

    this.model = model;
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  async create(data, options = {}) {
    return this.model.create([data], options).then((docs) => docs[0]);
  }

  async createMany(data, options = {}) {
    return this.model.insertMany(data, options);
  }

  /*
    |--------------------------------------------------------------------------
    | Find One
    |--------------------------------------------------------------------------
    */

  async findById(id, options = {}) {
    let query = this.model.findById(id);

    query = this.#applyOptions(query, options);

    return query;
  }

  async findOne(filter = {}, options = {}) {
    let query = this.model.findOne(filter);

    query = this.#applyOptions(query, options);

    return query;
  }

  /*
    |--------------------------------------------------------------------------
    | Find Many
    |--------------------------------------------------------------------------
    */

  async find(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      paginate = false,
      sort = { createdAt: -1 },
    } = options;

    let query = this.model.find(filter);

    query = this.#applyOptions(query, {
      ...options,
      sort,
    });

    if (!paginate) {
      return query;
    }

    const total = await this.model.countDocuments(filter);

    const pages = Math.ceil(total / limit);

    query.skip((page - 1) * limit);

    query.limit(limit);

    const data = await query;

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    };
  }

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  async updateById(id, data, options = {}) {
    let query = this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      ...options,
    });

    query = this.#applyOptions(query, options);

    return query;
  }

  async updateOne(filter, data, options = {}) {
    let query = this.model.findOneAndUpdate(filter, data, {
      new: true,
      runValidators: true,
      ...options,
    });

    query = this.#applyOptions(query, options);

    return query;
  }

  async updateMany(filter, data) {
    return this.model.updateMany(filter, data);
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  async deleteOne(filter) {
    return this.model.deleteOne(filter);
  }

  async deleteMany(filter) {
    return this.model.deleteMany(filter);
  }

  /*
    |--------------------------------------------------------------------------
    | Soft Delete
    |--------------------------------------------------------------------------
    */

  async softDelete(id, userId = null) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId,
      },
      {
        new: true,
      },
    );
  }

  async restore(id) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      {
        new: true,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Utilities
    |--------------------------------------------------------------------------
    */

  async exists(filter = {}) {
    return this.model.exists(filter);
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async aggregate(pipeline = []) {
    return this.model.aggregate(pipeline);
  }

  async startTransaction() {
    const session = await mongoose.startSession();

    session.startTransaction();

    return session;
  }

  /*
    |--------------------------------------------------------------------------
    | Private Helpers
    |--------------------------------------------------------------------------
    */

  #applyOptions(query, options) {
    const { select, populate, sort, lean = false, session } = options;

    if (select) {
      query.select(select);
    }

    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((item) => {
          query.populate(item);
        });
      } else {
        query.populate(populate);
      }
    }

    if (sort) {
      query.sort(sort);
    }

    if (lean) {
      query.lean();
    }

    if (session) {
      query.session(session);
    }

    return query;
  }
}

export default BaseRepository;
/**
 * import BaseRepository from "../../shared/base/BaseRepository.js";
import Business from "./business.model.js";

class BusinessRepository extends BaseRepository {
    constructor() {
        super(Business);
    }

    async findBySlug(slug) {
        return this.findOne({
            slug,
        });
    }

    async findByOwner(ownerId) {
        return this.findOne({
            ownerId,
        });
    }
}

export default new BusinessRepository();

const businesses = await BusinessRepository.find(
    {
        status: "active",
    },
    {
        paginate: true,
        page: 2,
        limit: 20,
        sort: {
            createdAt: -1,
        },
    }
);
 */
