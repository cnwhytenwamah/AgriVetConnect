import * as servicesService from "./services.service.js";

export const getAllServices = async (req, res) => {
  try {
    const service = await servicesService.getAllServices();
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch services" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const id = String(req.params.id);
    const service = await servicesService.getServiceById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch service" });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await servicesService.createService(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create service" });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = String(req.params.id);
    const service = await servicesService.updateService(id, req.body);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update service" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const id = String(req.params.id);
    await servicesService.deleteService(id);
    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete service" });
  }
};
