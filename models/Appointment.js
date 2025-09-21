const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Appointment = sequelize.define(
  "Appointments",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      validate: { isEmail: true },
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Nam", "Nữ", "Khác", ""),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    specialtyId: {
      type: DataTypes.INTEGER,
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    session: {
      type: DataTypes.ENUM("Buổi sáng", "Buổi chiều"),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Appointment;
