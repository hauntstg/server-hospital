const Appointment = require("../../models/Appointment");

function convertDateFormat(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;

  const day = parts[0].padStart(2, "0");
  const month = parts[1].padStart(2, "0");
  const year = parts[2];

  return `${month}/${day}/${year}`;
}

exports.createAppointment = async (req, res, next) => {
  try {
    const userIdFromJwt = req.auth?.sub ?? null;
    const { department, dob, appointmentDate, ...appointment } = req.body;
    // console.log(appointmentDate);
    // console.log(convertDateFormat(appointmentDate));
    // return;
    const newAppointment = { ...appointment };
    newAppointment.userId = userIdFromJwt;
    newAppointment.specialtyId = department;
    newAppointment.appointmentDate = convertDateFormat(appointmentDate);
    if (dob === "") newAppointment.dob = null;
    // console.log(newAppointment);
    const created = await Appointment.create(newAppointment);
    res.status(200).json(created);
  } catch (error) {
    console.log(error);
  }
};
