// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./db/sequelize"); // đường dẫn đến file cấu hình Sequelize
const appointmentRoutes = require("./routes/admin/appointment");
const authRoutes = require("./routes/admin/auth");
const { User, Specialties, Appointment } = require("./db/index");

const app = express();
app.use(cookieParser());
app.set("trust proxy", 1);
const allowedOrigins = [
  "http://localhost:5173",
  "https://client-hospital-kappa.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// check db
app.get("/db-health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).send("DB connected!");
  } catch (error) {
    console.error("DB errore:", error);
    res.status(500).send("DB error!");
  }
});

app.use("/admin", appointmentRoutes);
app.use("/admin", authRoutes);

// console.log(Object.keys(Appointment.associations));
// console.log(Object.keys(User.associations));
// console.log(Object.keys(Specialties.associations));

const PORT = process.env.PORT || 5000;
// sequelize.sync({ alter: true });
sequelize
  .sync({ alter: true })
  .then(() => console.log("DB synced"))
  .catch(console.error);
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected!");
  } catch (err) {
    console.error("DB error:", err);
  }
  console.log(`Server listening on port ${PORT}`);
});
