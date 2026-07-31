import BaseRepository from "../../shared/base/BaseRepository.js";

import Business from "./business.model.js";

class BusinessRepository extends BaseRepository {
  constructor() {
    super(Business);
  }

  async findBySlug(slug) {
    return this.findOne({
      slug: slug.toLowerCase(),
    });
  }

  async slugExists(slug) {
    return this.exists({
      slug: slug.toLowerCase(),
    });
  }

  async findByOwner(ownerId) {
    return this.findOne(
      {
        ownerId,
      },
      {
        populate: {
          path: "ownerId",
          select: "firstName lastName email",
        },
      },
    );
  }

  async ownerAlreadyHasBusiness(ownerId) {
    return this.exists({
      ownerId,
    });
  }

  async updateModules(businessId, enabledModules) {
    return this.updateById(businessId, {
      enabledModules,
    });
  }

  async findBusinessProfile(id) {
    return this.findById(id, {
      populate: [
        {
          path: "ownerId",
          select: "firstName lastName email phone",
        },
      ],
    });
  }
}

export default new BusinessRepository();
