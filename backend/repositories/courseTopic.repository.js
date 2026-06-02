import CourseTopic from "../models/CourseTopic.js";

export const createCourseTopic = async (payload) => {
  return CourseTopic.create(payload);
};

export const getAllCourseTopics = async () => {
  return CourseTopic.find()
    .populate("course", "title slug")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
};

export const getCourseTopicBySlug = async (slug) => {
  return CourseTopic.findOne({ slug })
    .populate("course", "title slug")
    .populate("createdBy", "name email");
};

export const getCourseTopicById = async (id) => {
  return CourseTopic.findById(id)
    .populate("course", "title slug")
    .populate("createdBy", "name email");
};

export const updateCourseTopic = async (id, payload) => {
  return await CourseTopic.findByIdAndUpdate(
    id, payload, { new: true })
    .populate("course", "title slug")
    .populate("createdBy", "name email");
};

export const deleteCourseTopic = async (id) => {
  return CourseTopic.findByIdAndDelete(id);
};
