// Here we will create controller functions which we will reference in the router file
// We need to import the 'Workout' model because we will be using that to interact with the database
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    // 'workouts' is an array of documents (now we only want workouts of logged in user)
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }); // desc. order = newest first
    res.status(200).json(workouts); // we send the array of documents as 'json' which will be 'fetched' by the frontend '<Home />' page
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // to reduce db calls we can pre-check whether the id is valid or not but for this we need to require 'mongoose'
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: '_id is not valid' });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'No such workout is present' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body; // getting req from client

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  // creates and adds a 'workout' document inside 'workouts' collection
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id }); // querying the database and getting back the result (asynchronous operation)

    res.status(200).json(workout); // sending data back to client
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // to reduce db calls we can pre-check whether the id is valid or not but for this we need to require 'mongoose'
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: '_id is not valid' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(400).json({ error: 'No such workout is present' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // to reduce db calls we can pre-check whether the id is valid or not but for this we need to require 'mongoose'
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: '_id is not valid' });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body, // whatever fields are send here are updated rest of the fields remain the same
      }
    );

    if (!workout) {
      return res.status(400).json({ error: 'No such workout is present' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
