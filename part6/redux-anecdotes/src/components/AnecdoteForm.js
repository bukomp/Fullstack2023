import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await anecdotesService.create({ content, votes: 0 });

    dispatch(addAnecdote(newAnecdote));
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
