import Course from "../models/Course.js";

export const createCourse = async (
  payload
) => {
  return Course.create(payload);
};

export const getAllCourses =
  async () => {
    return Course.find()
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        createdAt: -1,
      });
  };

export const getCourseBySlug =
  async (slug) => {
    return Course.findOne({
      slug,
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
      }
    );
  };

export const deleteCourse =
  async (id) => {
    return Course.findByIdAndDelete(
      id
    );
  };