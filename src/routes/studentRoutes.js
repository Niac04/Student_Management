import express from "express";
import {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.route("/").get(getStudents).post(addStudent);

router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);

export default router;
