import SequenceRepository from "./sequence.repository.js";

class SequenceService {
  format(sequence) {
    const number = String(sequence.nextNumber).padStart(sequence.padding, "0");

    return [sequence.prefix, number].join(sequence.separator) + sequence.suffix;
  }

  async next(businessId, key, config) {
    const sequence = await SequenceRepository.next(businessId, key, config);

    return this.format(sequence);
  }
}

export default new SequenceService();
