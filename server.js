const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/roll-dice", (req, res) => {
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  const result = die1 + die2;
  res.json({ result });
});

app.post("/calculate-result", (req, res) => {
  const { points, betAmount, betChoice, result } = req.body;
  let updatedPoints = points;
  let message = "";

  switch (betChoice) {
    case "7 Down":
      if (result < 7) {
        updatedPoints += betAmount;
        message = `You won! New points: ${updatedPoints}`;
      } else {
        updatedPoints -= betAmount;
        message = `You lost! New points: ${updatedPoints}`;
      }
      break;
    case "Lucky 7":
      if (result === 7) {
        updatedPoints += betAmount * 5;
        message = `You won! New points: ${updatedPoints}`;
      } else {
        updatedPoints -= betAmount;
        message = `You lost! New points: ${updatedPoints}`;
      }
      break;
    case "7 Up":
      if (result > 7) {
        updatedPoints += betAmount;
        message = `You won! New points: ${updatedPoints}`;
      } else {
        updatedPoints -= betAmount;
        message = `You lost! New points: ${updatedPoints}`;
      }
      break;
    default:
      message = "Invalid bet choice.";
      break;
  }
  res.json({ updatedPoints, message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
