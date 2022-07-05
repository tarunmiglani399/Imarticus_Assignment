const { Course } = require("../models/model");

const getCourse = async () => {
  return Course.findOne({});
};

module.exports.courseService = { getCourse };
