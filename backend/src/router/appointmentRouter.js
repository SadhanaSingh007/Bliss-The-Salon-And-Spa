
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import appointmentController from "../controller/appointmentController.js";

const appointmentRouter = Router();

// Book an appointment
appointmentRouter.post("/book", authMiddleware,appointmentController.bookAppointment);

appointmentRouter.delete("/deleteall",appointmentController.deleteAllAppointments);
appointmentRouter.delete("/deleteone/:service", appointmentController.deleteSingleAppointment);
appointmentRouter.get("/:user", authMiddleware, appointmentController.getUserAppointments);

export default appointmentRouter;