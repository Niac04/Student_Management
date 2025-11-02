import Course from "../models/courseModel.js";
import { validateCourse } from "../utils/validateInput.js";

export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

export const addCourse = async (req, res, next) => {
  try {
    const { valid, errors } = validateCourse(req.body);
    if (!valid) return res.status(400).json({ success: false, errors });

    const existing = await Course.findOne({ where: { code: req.body.code } });
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "Course code already exists" });

    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { valid, errors } = validateCourse(req.body, { partial: true });
    if (!valid) return res.status(400).json({ success: false, errors });

    const course = await Course.findByPk(id);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    await course.update(req.body);
    res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    await course.destroy();
    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    next(err);
  }
};
