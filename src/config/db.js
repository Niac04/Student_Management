import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "testdb";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});
console.log(DB_HOST, DB_NAME, DB_PASSWORD, DB_USER);
// console.log(sequelize)

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // Ensure models/tables are created (safe for development). In production migrate instead.
    await sequelize.sync();
    console.log("✅ MySQL Database connected and models synced successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};
export { sequelize };
export default { sequelize, connectDB };
