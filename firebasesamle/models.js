const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const careerOptionSchema = new mongoose.Schema({
  minScore: Number,
  maxScore: Number,
  career: String
});

const careerTestSchema = new mongoose.Schema({
  interest: String,
  questions: [questionSchema],
  careerOptions: [careerOptionSchema]
});

module.exports = mongoose.model("CareerTest", careerTestSchema);