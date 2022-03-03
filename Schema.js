var mongoose = require("mongoose");
var validator = require("validator");

var emailSchema = new mongoose.Schema({});

var studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: "999-999-9999",
  },
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

// const Email = mongoose.model("Email", emailSchema);
const Student = mongoose.model("Students", studentSchema);
module.exports = { Student };
