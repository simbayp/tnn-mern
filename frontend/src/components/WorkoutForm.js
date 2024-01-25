import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

function WorkoutForm() {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  function handleTitleChange(event) {
    const { value } = event.target;
    setTitle(value);
  }

  function handleLoadChange(event) {
    const { value } = event.target;
    setLoad(value);
  }

  function handleRepsChange(event) {
    const { value } = event.target;
    setReps(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const workout = { title, load, reps }; // dummy workout object that we will send as body of request

    const response = await fetch('https://tnn-mern.vercel.app/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout), // we can't send object, we will turn it into string
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={handleTitleChange}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        onChange={handleLoadChange}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={handleRepsChange}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
