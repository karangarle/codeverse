import Progress from "../models/Progress.js";
import CourseTopic from "../models/CourseTopic.js";

/**
 * Get progress details for a course
 */
export const getCourseProgressService = async (userId, courseId) => {
  const totalTopics = await CourseTopic.countDocuments({
    course: courseId,
    isPublished: true,
  });

  const completedProgress = await Progress.find({
    user: userId,
    course: courseId,
    isCompleted: true,
  }).select("topic");

  const completedTopicIds = completedProgress.map((p) => p.topic.toString());

  const progressPercentage =
    totalTopics > 0 ? Math.round((completedTopicIds.length / totalTopics) * 100) : 0;

  return {
    completedTopicIds,
    progressPercentage,
    totalTopics,
  };
};

/**
 * Toggle topic completion status
 */
export const toggleTopicCompletionService = async (userId, courseId, topicId) => {
  const existingProgress = await Progress.findOne({
    user: userId,
    course: courseId,
    topic: topicId,
  });

  if (existingProgress) {
    await Progress.deleteOne({ _id: existingProgress._id });
    const stats = await getCourseProgressService(userId, courseId);
    return {
      isCompleted: false,
      ...stats,
    };
  } else {
    await Progress.create({
      user: userId,
      course: courseId,
      topic: topicId,
      isCompleted: true,
      completedAt: new Date(),
    });
    const stats = await getCourseProgressService(userId, courseId);
    return {
      isCompleted: true,
      ...stats,
    };
  }
};