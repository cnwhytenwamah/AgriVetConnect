const servicesService = require("./services.service");

const getAllServices = async (req, res) => {
  try {
    const service = await servicesService.getAllServices();
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch services" });
  }
};

const getServiceById = async (req, res) => {
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

const createService = async (req, res) => {
  try {
    const service = await servicesService.createService(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create service" });
  }
};

const updateService = async (req, res) => {
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

const deleteService = async (req, res) => {
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

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
