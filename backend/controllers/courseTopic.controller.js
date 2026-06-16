import ApiResponse from "../utils/ApiResponse.js";

import {
    createCourseTopicService,
    deleteCourseTopicService,
    getAllCourseTopicsService,
    getCourseTopicByIdService,
    updateCourseTopicService
} from "../services/courseTopic.service.js";

export const createCourseTopic =
    async (
        req,
        res,
        next
    ) => {
        try {
            const result = await createCourseTopicService({
                ...req.body,
                createdBy: req.user._id,
            });
            return res.status(201).json(
                new ApiResponse(
                    201,
                    "Course topic created successfully",
                    result
                )
            );
        } catch (error) {
            next(error);
        }
    };

export const getAllCourseTopics =
    async (req, res, next) => {
        try {
            const courseTopics = await getAllCourseTopicsService({
                isPublished: true,
            });
            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Course topics retrieved successfully",
                    courseTopics
                )
            );
        } catch (error) {
            next(error);
        }
    };

export const getAdminCourseTopics =
    async (req, res, next) => {
        try {
            const courseTopics = await getAllCourseTopicsService();
            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Admin course topics retrieved successfully",
                    courseTopics
                )
            );
        } catch (error) {
            next(error);
        }
    };

export const getCourseTopicById =
    async (req, res, next) => {
        try {
            const courseTopic = await getCourseTopicByIdService(req.params.id);
            if (!courseTopic) {
                return res.status(404).json(
                    new ApiResponse(
                        404,
                        "Course topic not found"
                    )
                );
            }
            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Course topic retrieved successfully",
                    courseTopic
                )
            );
        } catch (error) {
            next(error);
        }
    };

export const updateCourseTopic =
    async (
        req,
        res,
        next
    ) => {
        try {
            const courseTopic = await updateCourseTopicService(
                req.params.id,
                req.body
            );            
            if (!courseTopic) {
                return res.status(404).json(
                    new ApiResponse(
                        404,
                        "Course topic not found"
                    )
                );
            }
            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Course topic updated successfully",
                    courseTopic
                )
            );
        } catch (error) {
            next(error);
        }
    };

export const deleteCourseTopic =
    async (
        req,
        res,
        next
    ) => {
        try {
            const courseTopic = await deleteCourseTopicService(req.params.id);
            if (!courseTopic) {
                return res.status(404).json(
                    new ApiResponse(
                        404,
                        "Course topic not found"
                    )
                );
            }
            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Course topic deleted successfully",
                    courseTopic
                )
            );
        } catch (error) {
            next(error);
        }
    };

