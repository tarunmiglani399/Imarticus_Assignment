const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { courseService } = require("../services/service");

const getCourse = catchAsync(async (req, res) => {
  const course = await courseService.getCourse();
  if (!course) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went Wrong, Please try again later"
    );
  }
  res.status(httpStatus.OK).json(course);
});

module.exports = {
  getCourse,
};
