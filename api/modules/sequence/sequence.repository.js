import BaseRepository from "../../shared/base/BaseRepository.js";

import Sequence from "./sequence.model.js";

class SequenceRepository extends BaseRepository {
  constructor() {
    super(Sequence);
  }

  async next(businessId, key, defaults = {}) {
    return this.model.findOneAndUpdate(
      {
        businessId,
        key,
      },

      {
        $setOnInsert: defaults,

        $inc: {
          nextNumber: 1,
        },
      },

      {
        new: true,
        upsert: true,
      },
    );
  }
}

export default new SequenceRepository();
