const express = require("express");
const { getCourse } = require("../controllers/controller");

const router = express.Router();

router.get("/course", getCourse);

module.exports = router;
