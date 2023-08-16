export const addAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  };
};
