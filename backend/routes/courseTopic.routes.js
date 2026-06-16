import express from 'express';

import { createCourseTopic, deleteCourseTopic, getAdminCourseTopics, getAllCourseTopics, getCourseTopicById, updateCourseTopic } from '../controllers/courseTopic.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

import authorize from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createCourseTopicValidation, updateCourseTopicValidation } from '../validations/courseTopic.validation.js';

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    createCourseTopicValidation,
    validate,
    createCourseTopic
);

router.get("/", getAllCourseTopics);

router.get(
    "/admin/all",
    authMiddleware,
    authorize("admin"),
    getAdminCourseTopics
);

router.get("/:id", getCourseTopicById);

router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    updateCourseTopicValidation,
    validate,
    updateCourseTopic
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    deleteCourseTopic
);

export default router;
