import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseBySlug,
  updateCourse,
} from "../repositories/course.repository.js";

export const createCourseService =
  async (payload) => {
    return createCourse(payload);
  };

  export const getAllCoursesService =
  async () => {
    return getAllCourses();
  };

  export const getCourseBySlugService =
  async (slug) => {
    return getCourseBySlug(slug);
  };

  export const updateCourseService =
  async (
    id,
    payload
  ) => {
    return updateCourse(
      id,
      payload
    );
  };

  export const deleteCourseService =
  async (id) => {
    return deleteCourse(id);
  };