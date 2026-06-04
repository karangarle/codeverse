import Progress from "../models/Progress.js";

export const findProgress =
  async (
    userId,
    courseId
  ) => {
    return Progress.findOne({
      user: userId,
      course: courseId,
    });
  };

export const createProgress =
  async (payload) => {
    return Progress.create(payload);
  };

export const updateProgress =
  async (
    id,
    payload
  ) => {
    return Progress.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
      }
    );
  };