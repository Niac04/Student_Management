import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";



class Course extends Model { }
Course.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    instructor: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "courses"
  }
);

export default Course;
