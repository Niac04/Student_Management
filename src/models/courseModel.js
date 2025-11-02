import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Course = sequelize.define(
  "Course",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    instructor: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, tableName: "courses" }
);

export default Course;
