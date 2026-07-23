import { Request, Response } from "express";
import * as appointmentsService from "./appointments.service";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await appointmentsService.getAllAppointments();
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointment" });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const appointments = await appointmentsService.getAppointmentById(id);
    if (!appointments) {
      return res
        .status(404)
        .json({ success: false, message: "Appointments not found" });
    }
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments" });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointments = await appointmentsService.createAppointment(req.body);
    res.status(201).json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create Appointments" });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const appointments = await appointmentsService.updateAppointment(
      id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update the Appointment" });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await appointmentsService.deleteAppointment(id);
    res.status(200).json({ success: true, message: "Appointments deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete appointment" });
  }
};
