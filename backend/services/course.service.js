import {
  createCourse,
  getAllCourses,
} from "../repositories/course.repository.js";

export const createCourseService =
  async (payload) => {
    return createCourse(payload);
  };

  export const getAllCoursesService =
  async () => {
    return getAllCourses();
  };