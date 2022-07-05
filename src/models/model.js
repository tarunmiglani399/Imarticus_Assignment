const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  chapters: [
    {
      chapterHeader: {
        type: String,
        required: true,
        trim: true,
      },
      section: [
        {
          sectionHeader: {
            type: String,
            required: true,
            trim: true,
          },
          url: {
            type: String,
            trim: true,
          },
        },
      ],
    },
  ],
});

const Course = mongoose.model("courses", courseSchema);

module.exports = {
  Course,
};
