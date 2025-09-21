// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const User = sequelize.define(
  "Users",
  {
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "support", "customer"),
      defaultValue: "customer",
      allowNull: false,
    },
  },
  {
    timestamps: true, // có createdAt, updatedAt
  }
);

module.exports = User;
