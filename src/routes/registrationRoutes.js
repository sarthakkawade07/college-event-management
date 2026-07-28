const express = require("express");
const router = express.Router();

const {
  registerStudent,
} = require("../controllers/registrationController");

router.post("/register", registerStudent);

module.exports = router;