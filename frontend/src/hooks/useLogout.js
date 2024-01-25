import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem('user');

    // reset the global user state to null
    dispatch({ type: 'LOGOUT' });

    // remove all the workouts of the user
    workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};
