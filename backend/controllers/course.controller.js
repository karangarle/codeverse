import ApiResponse from "../utils/ApiResponse.js";

import {
  createCourseService,
  getAllCoursesService
} from "../services/course.service.js";

export const createCourse =
  async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await createCourseService({
          ...req.body,
          createdBy:
            req.user._id,
        });

      return res.status(201).json(
        new ApiResponse(
          201,
          "Course created successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const getAllCourses =
  async (req, res, next) => {
    try {
        console.log("inside Code");
        
      const courses =
        await getAllCoursesService();

      return res.status(200).json(
        new ApiResponse(
          200,
          "Courses fetched successfully",
          courses
        )
      );
    } catch (error) {
      next(error);
    }
  };