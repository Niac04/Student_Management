import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Student = sequelize.define(
  "Student",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    department: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { timestamps: true, tableName: "students" }
);

export default Student;
