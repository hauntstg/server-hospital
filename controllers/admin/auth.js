require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const fullName = req.body.fullname;
  const password = req.body.password;
  const phone = req.body.phone;
  // console.log(email, fullName, password, phone);
  try {
    const existingUser = await User.findOne({
      where: { email },
    });
    // console.log(existingUser);
    if (existingUser) {
      res.status(409).json({ message: "Email đã được sử dụng!" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hash,
      phone,
    });

    res
      .status(201)
      .json({ message: "Tạo tài khoản thành công!", user: { id: newUser.id } });
  } catch (err) {
    res.status(400).json({ error: "Username taken" });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    const payload = { sub: user.id, role: user.role };
    // tạo token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // gửi token qua cookie HttpOnly
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    const { password: _pw, ...safeUser } = user.toJSON();
    console.log(user.toJSON());
    res.status(200).json({ message: "Đăng nhập thành công!", data: safeUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// ĐĂNG XUẤT: xoá cookie 'token'
exports.logout = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi đăng xuất" });
  }
};

// Lấy thông tin người dùng
exports.getProfile = async (req, res, next) => {
  const userId = req.auth?.sub;
  // console.log(userId);
  if (!userId) return res.status(401).json({ message: "Chưa đăng nhập" });

  const user = await User.findByPk(userId, {
    attributes: ["id", "email", "phone", "role"],
  });

  if (!user)
    return res.status(404).json({ message: "Không tìm thấy người dùng" });

  return res.status(200).json(user);
};

// Lấy thông tin người dùng
exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  const user = await User.findById(userId).populate("cart.productId");
  // res.status(200).json(user);
  res.status(200).json({
    _id: user._id,
    fullname: user.fullName,
    email: user.email,
    cart: user.cart,
  });
};

exports.checkHealth = async (req, res, next) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
};
