import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components import
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

function Home() {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://tnn-mern.vercel.app/api/workouts'); // The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON

      // 'json' is an array of objects where each object represents a workout
      const json = await response.json(); // .json() returns a promise that resolves with the result of parsing the response body text as JSON

      if (response.ok) {
        // setWorkouts(json);
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {/* cycle through all the workouts only when we definitely have them */}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
