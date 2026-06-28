import Course from "../models/Course.js";

export const createCourse = async (
  payload
) => {
  return Course.create(payload);
};

export const getAllCourses =
  async (filter = {}) => {
    return Course.find(filter)
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        order: 1,
        createdAt: -1,
      })
      .lean(); // Use lean() to return the raw MongoDB data without schema stripping
  };

export const getCourseBySlug =
  async (slug) => {
    return Course.findOne({
      slug,
      isPublished: true,
    }).populate(
      "createdBy",
      "name email"
    );
  };

export const getCourseById =
  async (id) => {
    return Course.findById(id);
  };

export const updateCourse =
  async (id, payload) => {
    return Course.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        strict: false, // Bypass strict mode in case the backend schema hasn't fully reloaded in memory
      }
    );
  };

export const deleteCourse =
  async (id) => {
    return Course.findByIdAndDelete(
      id
    );
  };
