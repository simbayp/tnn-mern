const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

// Requiring the auth middleware so that workouts of only verfied users are shown
const requireAuth = require('../middleware/requireAuth');

// creates an instance of a Router
const router = express.Router();

// attach a handler to this router
// router.get("/hello", () => {}); // this will fire only when the request comes from /api/workouts/hello
// e.g.: Test route
router.get('/test', (req, res) => res.json({ mssg: 'This is testing route' }));

// we need to start interacting with our db to add, retrieve or update documents

// Using the auth middleware
// require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;
