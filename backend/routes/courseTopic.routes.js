import express from 'express';

import { createCourseTopic, deleteCourseTopic, getAllCourseTopics, getCourseTopicById, updateCourseTopic } from '../controllers/courseTopic.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

import authorize from '../middlewares/role.middleware.js';

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    createCourseTopic
);

router.get("/", getAllCourseTopics);

router.get("/:id", getCourseTopicById);

router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    updateCourseTopic
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    deleteCourseTopic
);

export default router;