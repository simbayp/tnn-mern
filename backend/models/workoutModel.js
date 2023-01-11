// here we can define how our Workout documents should look

const mongoose = require("mongoose");

// to create a new schema - schema defines the structure of a particular type of document
const Schema = mongoose.Schema; // LHS Schema is a function

// this creates a new schema for us - the first object argument we pass inside it will define and enforce the schema
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// it will create a collection named 'workouts' since mongoose pluralises the model 'Workout'
module.exports = mongoose.model("Workout", workoutSchema); // we will interact with this "Workout"
