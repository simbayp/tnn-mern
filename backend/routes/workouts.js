const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// creates an instance of the Router
const router = express.Router();

// attach a handler to this router
// router.get("/hello", () => {}); // this will fire only when the request comes from /api/workouts/hello

// we need to start interacting with our db to add, retrieve or update documents

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
