const express = require("express");
const users = require("./users.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

// REST API Routes

// get all users
app.get("/api/users", (req, res) => {
  return res.json({
    status: true,
    message: `${users.length} users found`,
    data: users,
  });
});

// get user by id
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  let user = users.find((user) => user.id === +userId);
  if (user) {
    res.json(user);
  } else {
    res.send(`User does not exist with this ${userId} ID `);
  }
});

// create new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./users.json",
    JSON.stringify(users),
    "utf-8",

    (error, data) => {
      if (error) {
        res.status(500).json({ error: "Error updating user" });
      } else {
        res.json({
          status: "User created successfully",
          user: users,
        });
      }
    }
  );
});

// Update user info
app.patch("/api/users/:id", (req, res) => {
  const userId = +req.params.id;
  const body = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    // Update user object with new data
    users[userIndex] = { ...users[userIndex], ...body };
    // Write updated users array to file
    fs.writeFile(
      "./users.json",
      JSON.stringify(users),
      "utf-8",
      (error, data) => {
        if (error) {
          res.status(500).json({ error: "Error updating user" });
        } else {
          res.json({
            status: "User updated successfully",
            user: users[userIndex],
          });
        }
      }
    );
  } else {
    res.status(404).json({ error: `User with ID ${userId} not found` });
  }
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
  const userId = +req.params.id;
  // Check if the user exists
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    // User exists
    let newUsers = users.filter((user) => user.id !== userId);
    fs.writeFile(
      "./users.json",
      JSON.stringify(newUsers),
      "utf-8",
      (error, data) => {
        if (error) {
          res.send("Something went wrong");
        } else {
          res.json({ status: "User deleted successfully", users: newUsers });
        }
      }
    );
  } else {
    // User doesn't exist, send 404 error
    res.status(404).json({ error: `User with ID ${userId} not found` });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
