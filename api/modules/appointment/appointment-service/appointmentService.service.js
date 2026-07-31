import BaseService from "../../../shared/base/BaseService.js";

import ApiError from "../../../shared/errors/ApiError.js";

import AppointmentRepository from "../appointment/appointment.repository.js";

import ServiceRepository from "../../catalog/service/service.repository.js";

import EmployeeRepository from "../../people/employee/employee.repository.js";

import ServiceAssignmentRepository from "../../catalog/service-assignment/serviceAssignment.repository.js";

import ServicePriceService from "../../catalog/service-price/servicePrice.service.js";

import AppointmentServiceRepository from "./appointmentService.repository.js";

import AppointmentServiceService from "../appointment/appointment.service.js";

import PriceCalculator from "../../../shared/calculators/priceCalculator.js";

import {
  APPOINTMENT_SERVICE_MESSAGES,
  APPOINTMENT_SERVICE_STATUS,
} from "./appointmentService.constants.js";

class AppointmentService extends BaseService {
  constructor() {
    super(AppointmentServiceRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  async create(data, options = {}) {
    return super.create(data, options);
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    /*
        -------------------------------------------------
        Appointment
        -------------------------------------------------
        */

    const appointment = await AppointmentRepository.findById(
      data.appointmentId,
    );

    if (!appointment) {
      throw new ApiError(
        404,

        APPOINTMENT_SERVICE_MESSAGES.APPOINTMENT_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Service
        -------------------------------------------------
        */

    const service = await ServiceRepository.findById(data.serviceId);

    if (!service) {
      throw new ApiError(
        404,

        APPOINTMENT_SERVICE_MESSAGES.SERVICE_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Employee
        -------------------------------------------------
        */

    const employee = await EmployeeRepository.findById(data.employeeId);

    if (!employee) {
      throw new ApiError(
        404,

        APPOINTMENT_SERVICE_MESSAGES.EMPLOYEE_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Service Assignment
        -------------------------------------------------
        */

    const assignment =
      await ServiceAssignmentRepository.findByEmployeeAndService(
        data.businessId,

        data.employeeId,

        data.serviceId,
      );

    if (!assignment) {
      throw new ApiError(
        404,

        APPOINTMENT_SERVICE_MESSAGES.ASSIGNMENT_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Duplicate Service
        -------------------------------------------------
        */

    const exists = await this.repository.exists(
      data.businessId,

      data.appointmentId,

      data.serviceId,

      data.employeeId,
    );

    if (exists) {
      throw new ApiError(
        409,

        "Service already added to appointment.",
      );
    }

    /*
        -------------------------------------------------
        Current Price
        -------------------------------------------------
        */

    const currentPrice = await ServicePriceService.getCurrentPrice(
      data.businessId,

      data.serviceId,
    );

    if (!currentPrice) {
      throw new ApiError(
        404,

        APPOINTMENT_SERVICE_MESSAGES.INVALID_PRICE,
      );
    }

    /*
        -------------------------------------------------
        Snapshots
        -------------------------------------------------
        */

    data.serviceAssignmentId = assignment._id;

    data.serviceName = service.name;

    data.employeeName = employee.fullName;

    data.servicePrice = currentPrice.price;

    data.duration = assignment.estimatedDuration;

    data.commissionType = assignment.commissionType;

    data.commissionValue = assignment.commissionValue;

    data.quantity ??= 1;

    data.subtotal = data.servicePrice * data.quantity;

    data.status = APPOINTMENT_SERVICE_STATUS.PENDING;

    data.notes ??= "";

    return data;
  } /*
    |--------------------------------------------------------------------------
    | After Create
    |--------------------------------------------------------------------------
    */

  async afterCreate(appointmentService) {
    await AppointmentServiceService.recalculateTotals(
      appointmentService.businessId,

      appointmentService.appointmentId,
    );

    return appointmentService;
  }

  /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    const appointmentService = await this.repository.findById(id);

    if (!appointmentService) {
      throw new ApiError(
        404,

        APPOINTMENT_SERVICE_MESSAGES.NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Validate Employee
        -------------------------------------------------
        */

    if (data.employeeId) {
      const employee = await EmployeeRepository.findById(data.employeeId);

      if (!employee) {
        throw new ApiError(
          404,

          APPOINTMENT_SERVICE_MESSAGES.EMPLOYEE_NOT_FOUND,
        );
      }

      const assignment =
        await ServiceAssignmentRepository.findByEmployeeAndService(
          appointmentService.businessId,

          data.employeeId,

          appointmentService.serviceId,
        );

      if (!assignment) {
        throw new ApiError(
          404,

          APPOINTMENT_SERVICE_MESSAGES.ASSIGNMENT_NOT_FOUND,
        );
      }

      data.employeeName = employee.fullName;

      data.serviceAssignmentId = assignment._id;

      data.duration = assignment.estimatedDuration;

      data.commissionType = assignment.commissionType;

      data.commissionValue = assignment.commissionValue;
    }

    /*
        -------------------------------------------------
        Quantity
        -------------------------------------------------
        */

    const quantity = data.quantity ?? appointmentService.quantity;

    const price = data.servicePrice ?? appointmentService.servicePrice;

    data.subtotal = quantity * price;

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | After Update
    |--------------------------------------------------------------------------
    */

  async afterUpdate(appointmentService) {
    await AppointmentServiceService.recalculateTotals(
      appointmentService.businessId,

      appointmentService.appointmentId,
    );

    return appointmentService;
  }

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  async update(id, data, options = {}) {
    return super.update(
      id,

      data,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Id
    |--------------------------------------------------------------------------
    */

  async findById(id) {
    const appointmentService = await this.repository.findById(id);

    if (!appointmentService) {
      throw new ApiError(
        404,

        APPOINTMENT_SERVICE_MESSAGES.NOT_FOUND,
      );
    }

    return appointmentService;
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Appointment
    |--------------------------------------------------------------------------
    */

  async getByAppointment(businessId, appointmentId, options = {}) {
    return this.repository.findByAppointment(
      businessId,

      appointmentId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Employee
    |--------------------------------------------------------------------------
    */

  async getByEmployee(businessId, employeeId, options = {}) {
    return this.repository.findByEmployee(
      businessId,

      employeeId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Service
    |--------------------------------------------------------------------------
    */

  async getByService(businessId, serviceId, options = {}) {
    return this.repository.findByService(
      businessId,

      serviceId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async delete(id, options = {}) {
    const appointmentService = await this.findById(id);

    await this.repository.delete(
      appointmentService._id,

      options,
    );

    await AppointmentServiceService.recalculateTotals(
      appointmentService.businessId,

      appointmentService.appointmentId,
    );

    return true;
  }

  /*
    |--------------------------------------------------------------------------
    | Delete By Appointment
    |--------------------------------------------------------------------------
    */

  async deleteByAppointment(businessId, appointmentId, options = {}) {
    await this.repository.deleteByAppointment(
      businessId,

      appointmentId,

      options,
    );

    await AppointmentServiceService.recalculateTotals(
      businessId,

      appointmentId,
    );

    return true;
  }
}

export default new AppointmentService();
