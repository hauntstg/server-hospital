const express = require("express");
const specialtyController = require("../../controllers/admin/specialty");

const router = express.Router();

router.post("/specialty", specialtyController.getSpecialties);

module.exports = router;
