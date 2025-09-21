const sequelize = require("../db/sequelize");
const Specialties = require("../models/Specialties");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

Appointment.belongsTo(Specialties, {
  foreignKey: { name: "specialtyId", allowNull: false },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Specialties.hasMany(Appointment, { foreignKey: "specialtyId" });
User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: true },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = { sequelize, User, Specialties, Appointment };
