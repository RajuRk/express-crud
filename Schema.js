var mongoose = require("mongoose");
var validator = require("validator");

var emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
});

var studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: "999-999-9999",
  },
});

const Email = mongoose.model("Email", emailSchema);
const Student = mongoose.model("Student", studentSchema);
module.exports = { Email, Student };
