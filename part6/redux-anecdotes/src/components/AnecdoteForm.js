import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addAnecdote(content));
    dispatch(setNotification(`New anecdote "${content}" created!`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    event.target.anecdote.value = '';
  };

  return (
    <form onSubmit={addNew}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
