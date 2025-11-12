import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";


class Student extends Model { }
Student.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    department: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "students"
  }
);

export default Student;
