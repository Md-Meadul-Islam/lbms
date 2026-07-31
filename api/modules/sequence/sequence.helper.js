import SequenceService from "./sequence.service.js";

import { SEQUENCE_CONFIG } from "./sequence.constants.js";

export const nextSequence = (businessId, config) => {
  return SequenceService.next(businessId, config.key, config);
};

export const nextEmployeeCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.EMPLOYEE);

export const nextCustomerCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.CUSTOMER);

export const nextServiceCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.SERVICE);

export const nextServicePriceCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.SERVICE);

export const nextServiceAddonCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.SERVICE);

export const nextServiceAddonPriceCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.SERVICE);

export const nextCategoryCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.SERVICE_CATEGORY);

export const nextInvoiceCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.INVOICE);

export const nextSaleCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.SALE);

export const nextPurchaseCode = (businessId) =>
  nextSequence(businessId, SEQUENCE_CONFIG.PURCHASE);
