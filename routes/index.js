var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Student } = require("../Schema");
const { dburl, mongodb, MongoClient } = require("../dbConfig");

mongoose.connect(dburl);

router.get("/", async (req, res) => {
  const emails = await Student.find();
  res.send(emails);
});

router.post("/email", async (req, res) => {
  try {
    const email = await Student.create(req.body);
    res.send(email);
  } catch (error) {
    res.json({ message: error._message });
  }
});

module.exports = router;
