import ApiResponse from "../utils/ApiResponse.js";

import {
  createCourseService,
  deleteCourseService,
  getAllCoursesService,
  getCourseBySlugService,
  updateCourseService
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

export const getCourse =
  async (req, res, next) => {
    try {
      const course =
        await getCourseBySlugService(
          req.params.slug
        );

      if (!course) {
        return res.status(404).json({
          success: false,
          message:
            "Course not found",
        });
      }

      return res.status(200).json(
        new ApiResponse(
          200,
          "Course fetched successfully",
          course
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const updateCourse =
  async (
    req,
    res,
    next
  ) => {
    try {
      const course =
        await updateCourseService(
          req.params.id,
          req.body
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Course updated successfully",
          course
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const deleteCourse =
  async (
    req,
    res,
    next
  ) => {
    try {
      await deleteCourseService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Course deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };