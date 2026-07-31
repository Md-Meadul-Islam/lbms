import { Router } from "express";

import BusinessRoutes from "../modules/business/business.routes.js";
import EmployeeRoutes from "../modules/people/employee/employee.routes.js";
import CustomerRoutes from "../modules/people/customer/customer.routes.js";
import CategoryRoutes from "../modules/catalog/category/category.routes.js";
import ServiceRoutes from "../modules/catalog/service/service.routes.js";
import ServicePriceRoutes from "../modules/catalog/service-price/servicePrice.routes.js";
import ServiceAddonRoutes from "../modules/catalog/service-addon/serviceAddon.routes.js";
import ServiceAddonPriceRoutes from "../modules/catalog/service-addon-price/serviceAddonPrice.routes.js";
import ServiceAssignmentRoutes from "../modules/catalog/service-assignment/serviceAssignment.routes.js";
import AppointmentRoutes from "../modules/appointment/appointment/appointment.routes.js";
import AppointmentServiceRoutes from "../modules/appointment/appointment-service/appointmentService.routes.js";
import AppointmentAddonRoutes from "../modules/appointment/appointment-addon/appointmentAddon.routes.js";
import NotificationRoutes from "../modules/notification/notification.routes.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Business
|--------------------------------------------------------------------------
*/

router.use("/businesses", BusinessRoutes);

/*
|--------------------------------------------------------------------------
| People
|--------------------------------------------------------------------------
*/

router.use("/employees", EmployeeRoutes);

router.use("/customers", CustomerRoutes);

/*
|--------------------------------------------------------------------------
| Catalog
|--------------------------------------------------------------------------
*/

router.use("/categories", CategoryRoutes);
router.use("/services", ServiceRoutes);
router.use("/service-price", ServicePriceRoutes);
router.use("/service-addons", ServiceAddonRoutes);
router.use("/service-addon-prices", ServiceAddonPriceRoutes);
router.use("/service-assignments", ServiceAssignmentRoutes);

/*
|--------------------------------------------------------------------------
| Appointment
|--------------------------------------------------------------------------
*/

router.use("/appointments", AppointmentRoutes);
router.use("/appointment-services", AppointmentServiceRoutes);
router.use("/appointment-addons", AppointmentAddonRoutes);

router.use("/notifications", NotificationRoutes);

export default router;
