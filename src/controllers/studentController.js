import Student from "../models/studentModel.js";
import logger from "../utils/logger.js";
import { sendStudentRecordDestroy, sendStudentUpdateMail, sendStudentWelcomeMail } from "../utils/services/mailService.js";
import { validateStudent } from "../utils/validateInput.js";


export const getStudents = async (req, res, next) => {
  try
  {
    const students = await Student.findAll();
    if (!students || students.length === 0)
    {
      res.status(404).json({ success: false, message: "No students found!" })
      return;
    }
    res.status(200).json({ success: true, data: students });
    return;
  } catch (err)
  {
    next(err);
  }
};

export const getStudent = async (req, res, next) => {
  try
  {
    const { id } = req.params;
    if (!id)
    {
      res.status(400).json({ message: "missing required parameter" })
    }
    const student = await Student.findByPk(id);
    if (!student)
    {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: student });
    return;
  } catch (err)
  {
    next(err);
  }
};

export const addStudent = async (req, res, next) => {
  try
  {
    const { valid, errors } = validateStudent(req.body);
    if (!valid) return res.status(400).json({ success: false, errors });

    const existing = await Student.findOne({
      where: { email: req.body.email },
    });
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });

    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });

    // Send welcome/notification email if email service configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && student.email)
    {
      sendStudentWelcomeMail(student).catch((err) => {
        logger.error('sending welcome email failed:', err.message)
      })
    }
  } catch (err)
  {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try
  {
    const { id } = req.params;
    const { valid, errors } = validateStudent(req.body, { partial: true });
    if (!valid) return res.status(400).json({ success: false, errors });

    const student = await Student.findByPk(id);
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    await student.update(req.body);
    res.json({ success: true, data: student });
    // Notify student about the update if email configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && student.email)
    {
      sendStudentUpdateMail(student).catch((err) => {
        logger.err('Error send update notification mail:', err.message);
      })
    }
  } catch (err)
  {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try
  {
    const { id } = req.params;
    if (!id)
    {
      return res.status(400).json({ success: false, message: "missing required parameters" })
    }
    const student = await Student.findByPk(id);
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    await student.destroy();
    res.json({ success: true, message: "Student deleted" });

    // Optionally notify student about deletion (best-effort)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && student.email)
    {
      sendStudentRecordDestroy(student).catch((err) => {
        logger.error('Error sending removal mail:', err.message)
      })
    }
  } catch (err)
  {
    next(err);
  }
};
