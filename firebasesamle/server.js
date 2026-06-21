const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const CareerTest = require("./models/CareerTest");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/project", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Route: Fetch questions by interest
app.get("/quiz/:interest", async (req, res) => {
  const interest = req.params.interest;
  const quiz = await CareerTest.findOne({ interest });
  if (!quiz) return res.status(404).json({ message: "Interest not found" });
  res.json(quiz.questions);
});

// Route: Evaluate answers and recommend career
app.post("/recommend/:interest", async (req, res) => {
  const interest = req.params.interest;
  const answers = req.body.answers; // array of user answers

  const quiz = await CareerTest.findOne({ interest });
  if (!quiz) return res.status(404).json({ message: "Interest not found" });

  // Calculate score
  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  // Find career based on score
  const career = quiz.careerOptions.find(
    (c) => score >= c.minScore && score <= c.maxScore
  );

  res.json({
    score,
    recommendedCareer: career ? career.career : "No career found"
  });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));