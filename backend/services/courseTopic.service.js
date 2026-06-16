import { getAllCourseTopics, getCourseTopicById, createCourseTopic, updateCourseTopic, deleteCourseTopic } from '../repositories/courseTopic.repository.js';

export const createCourseTopicService = async (payload) => {
    return createCourseTopic(payload);
};

export const getAllCourseTopicsService = async (filter = {}) => {
    return getAllCourseTopics(filter);
};

export const getCourseTopicByIdService = async (id) => {
    return getCourseTopicById(id);
};

export const updateCourseTopicService = async (id, payload) => {
    return updateCourseTopic(id, payload);
};

export const deleteCourseTopicService = async (id) => {
    return deleteCourseTopic(id);
};
