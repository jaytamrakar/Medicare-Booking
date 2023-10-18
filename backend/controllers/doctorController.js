import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated Doctor successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faied to update Doctor",
      error: error.message,
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted Doctor successfully",
      data: deletedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faied to delete Doctor",
      error: error.message,
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctor found successfully.",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Doctor not found",
      error: error.message,
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({
       
      }).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "All Doctors found",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Any Doctor not found",
      error: error.message,
    });
  }
};
