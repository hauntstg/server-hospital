const express = require("express");
const authGuard = require("../../middlewares/authGuard");
const authController = require("../../controllers/admin/auth");

const router = express.Router();

router.post("/dang-ky", authController.signup);

router.post("/dang-nhap", authController.signin);

router.post("/dang-xuat", authController.logout);

router.get("/profile", authGuard, authController.getProfile);

module.exports = router;
