import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/serviceModel.js";

// Helper function to validate name
const validateName = (name) => {
    return !!name && name.trim() !== "" && name.length >= 3 && name.length <= 50;
};

// Helper function to validate description
const validateDescription = (description) => {
    return !!description && description.trim() !== "" && description.length >= 10 && description.length <= 500;
};

// Helper function to validate price
const validatePrice = (price) => {
    return !isNaN(price) && price >= 0;
};

// create service
const createService = asyncHandler(async (req, res) => {
    // get data from body
    const { name, description, price } = req.body;
    
    // Validate all fields 
    if (!validateName(name)) {
        return res.status(400).json(new ApiResponse(400, null, "Please provide a valid name."));
    }
    if (!validateDescription(description)) {
        return res.status(400).json(new ApiResponse(400, null, "Please provide a valid description."));
    }
    if (!validatePrice(price)) {
        return res.status(400).json(new ApiResponse(400, null, "Please provide a valid price."));
    }

    // create service
    const service = await Service.create({ name, description, price });

    // validate service is created
    const createdService = await Service.findOne({ _id: service._id });
    if (!createdService) {
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while creating service."));
    }

    // send response
    return res.status(201).json(new ApiResponse(201, createdService, "Service created successfully."));
});

const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find({});
    if (services.length === 0){
        return res.status(404).json(new ApiResponse(404, null, "There is no services to show."));
    }
    return res.status(200).json(new ApiResponse(200, services, "Services fetched successfully."));
});

const updateService = asyncHandler(async (req, res) => {
    // get service id
    const { serviceId } = req.params;

    // get data from body
    const { name, description, price } = req.body;
    
    // get service
    const service = await Service.findOne({ _id: serviceId });

    if (!service) {
        return res.status(404).json(new ApiResponse(404, null, "Service not found."));
    }

    // Initialize an object to store updated fields
    let updatedFields = {};

    // Validate and set name if it's valid and different from the current value
    if (validateName(name) && name !== service.name) {
        updatedFields.name = name;
    }
    
    // Validate and set description if it's valid and different from the current value
    if (validateDescription(description) && description !== service.description) {
        updatedFields.description = description;
    }

    // Validate and set price if it's valid and different from the current value
    if (validatePrice(price) && price !== service.price) {
        updatedFields.price = price;
    }

    // Check if any fields were actually updated
    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json(new ApiResponse(400, null, "Nothing to Update"));
    }

    // Save the service with only the updated fields
    const updatedService = await Service.findOneAndUpdate({ _id: serviceId }, { $set: updatedFields }, { new: true });

    if (!updatedService) {
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while updating service."));
    }

    return res.status(200).json(new ApiResponse(200, updatedService, "Service updated successfully."));
});

const deleteService = asyncHandler(async (req, res) => {
   // get service id
    const { serviceId } = req.params;

    // delete service
    await Service.findByIdAndDelete(serviceId);

    return res.status(200).json(new ApiResponse(200, null, "Service deleted successfully."));
});

export { createService, getServices, updateService, deleteService };