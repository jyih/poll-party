const ALL_POLLS = 'polls/SET_POLLS'

const set = (polls) => ({
  type: ALL_POLLS,
  payload: polls
})

export const getPolls = () => async (dispatch) => {
  const res = await fetch(`/api/polls/`);

  if (res.ok) {
    const data = await res.json()
    if (data.errors) {
      return;
    }
    dispatch(set(data));
    return data;
  }
}

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ALL_POLLS:
      return action.payload
    default:
      return state;
  }
}