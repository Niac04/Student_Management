export const validateStudent = (payload = {}, options = {}) => {
  const errors = {};
  const { partial = false } = options;

  if (!partial || payload.name !== undefined) {
    if (!payload.name || typeof payload.name !== "string")
      errors.name = "Name is required and must be a string";
  }
  if (!partial || payload.age !== undefined) {
    if (payload.age === undefined || typeof payload.age !== "number")
      errors.age = "Age is required and must be a number";
  }
  if (!partial || payload.department !== undefined) {
    if (!payload.department || typeof payload.department !== "string")
      errors.department = "Department is required and must be a string";
  }
  if (!partial || payload.email !== undefined) {
    if (
      !payload.email ||
      typeof payload.email !== "string" ||
      !payload.email.includes("@")
    )
      errors.email = "Valid email is required";
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateCourse = (payload = {}, options = {}) => {
  const errors = {};
  const { partial = false } = options;

  if (!partial || payload.title !== undefined) {
    if (!payload.title || typeof payload.title !== "string")
      errors.title = "Title is required and must be a string";
  }
  if (!partial || payload.code !== undefined) {
    if (!payload.code || typeof payload.code !== "string")
      errors.code = "Code is required and must be a string";
  }
  if (!partial || payload.instructor !== undefined) {
    if (!payload.instructor || typeof payload.instructor !== "string")
      errors.instructor = "Instructor is required and must be a string";
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

export default { validateStudent, validateCourse };
