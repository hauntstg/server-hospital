const Appointment = require("../../models/Appointment");

exports.createAppointment = async (req, res, next) => {
  try {
    const userIdFromJwt = req.auth?.sub ?? null;
    const { department, dob, ...appointment } = req.body;
    const newAppointment = { ...appointment };
    newAppointment.userId = userIdFromJwt;
    newAppointment.specialtyId = department;
    if (dob === "") newAppointment.dob = null;
    console.log(newAppointment);
    const created = await Appointment.create(newAppointment);
    res.status(200).json(created);
  } catch (error) {
    console.log(error);
  }
};
