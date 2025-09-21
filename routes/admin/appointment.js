const express = require("express");
const optionalAuth = require("../../middlewares/optionalAuth");
const appointmentController = require("../../controllers/admin/appointment");

const router = express.Router();

router.post(
  "/dang-ky-kham",
  optionalAuth,
  appointmentController.createAppointment
);

module.exports = router;
