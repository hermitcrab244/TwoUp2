const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234567890",
  database: "twoup_game",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connection to database established");
});

const PORT = process.env.PORT || 5000;
const app = express().use(cors()).use(bodyParser.json());

app.post("/registration", (req, res) => {
  const { username, password } = req.body;

  const existingUserCheck = "SELECT * FROM users WHERE username = ?";
  db.query(existingUserCheck, [username], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error validation users" });
    } else {
      if (results.length > 0) {
        res.status(409).json({ message: "User already exsits" });
      } else {
        const insertQuery = `INSERT INTO users (username, password, colour_pref) VALUES (?, ?, 'default')`;
        db.query(insertQuery, [username, password], (err, result) => {
          if (err) {
            res.status(500).json({ message: "Error registering user" });
          } else {
            res.status(200).json({ message: "User registeration successful" });
          }
        });
      }
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Login error" });
    } else {
      if (results.length === 1) {
        const user = results[0];
        const userID = user.user_ID;
        const colour = user.colour_pref;
        console.log(userID, colour);

        res.status(200).json({
          message: "Login successful",
          userID: userID,
          colour_pref: colour,
        });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    }
  });
});

app.post("/end", (req, res) => {
  const { user_ID, username, score } = req.body;

  const insertQuery = `INSERT INTO game (user_ID, username, score) VALUES (?, ?, ?)`;
  db.query(insertQuery, [user_ID, username, score], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error saving game results" });
    } else {
      res.status(200).json({ message: "Results saved successfully" });
    }
  });
});

app.get("/retrieve-scores", (req, res) => {
  const retrieveQuery =
    "SELECT username, score FROM game ORDER BY score DESC LIMIT 10";
  db.query(retrieveQuery, (err, results) => {
    if (err) {
      res.status.json({ message: "Failed to retrieve scores" });
    } else {
      const response = {
        message: "Successfully retrieved scores",
        data: results,
      };

      res.status(200).json(response);
    }
  });
});

app.get("/user-highest-score", (req, res) => {
  const { username } = req.query;

  const userScoreQuery = `SELECT MAX(score) AS highest_score FROM game WHERE username = ?`;
  db.query(userScoreQuery, [username], (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Failed to retrieve users highest score" });
    } else {
      const response = {
        message: "Successfully retrieved users highscore",
        data: results[0].highest_score,
      };

      if (response.data === null) {
        res
          .status(200)
          .json({ message: "Play a round to get your score", data: 0 });
      } else {
        res.status(200).json(response);
      }
    }
  });
});

app.post("/colour-update", (req, res) => {
  const { colour_pref, user_ID } = req.body;

  const updateQuery = `UPDATE users SET colour_pref = ? WHERE user_ID = ?`;
  db.query(updateQuery, [colour_pref, user_ID], (err, results) => {
    if (err) {
      res.status.json({ message: "Failed to update colour preference" });
    } else {
      res
        .status(200)
        .json({ message: "Colour preference successfully updated" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
