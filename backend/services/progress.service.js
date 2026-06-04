import Progress from "../models/Progress.js";

import CourseTopic from "../models/CourseTopic.js";

import {
  findProgress,
  createProgress,
  updateProgress,
} from "../repositories/progress.repository.js";

export const markTopicCompletedService =
  async (
    userId,
    courseId,
    topicId
  ) => {
    let progress =
      await findProgress(
        userId,
        courseId
      );

    const totalTopics =
      await CourseTopic.countDocuments(
        {
          course: courseId,
        }
      );

    if (!progress) {
      progress =
        await createProgress({
          user: userId,
          course: courseId,
          completedTopics: [
            topicId,
          ],
          lastTopic: topicId,
        });
    } else {
      const alreadyCompleted =
        progress.completedTopics.some(
          (id) =>
            id.toString() ===
            topicId
        );

      if (!alreadyCompleted) {
        progress.completedTopics.push(
          topicId
        );
      }

      progress.lastTopic =
        topicId;

      progress.progressPercentage =
        Math.round(
          (progress
            .completedTopics
            .length /
            totalTopics) *
            100
        );

      await progress.save();
    }

    return progress;
  };
  