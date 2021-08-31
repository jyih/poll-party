
const SET_POLL = 'poll/SET_POLL';
const UNSET_POLL = 'poll/UNSET_POLL';

const set = (poll) => ({
  type: SET_POLL,
  payload: poll
})

const unset = () => ({
  type: UNSET_POLL
})

export const getPoll = (id) => async (dispatch) => {
  const res = await fetch(`/api/polls/${id}`)

  if (res.ok) {
    const data = await res.json()
    if (data.errors) {
      return;
    }
    // data.options = data.options.map(option => option.answer)
    dispatch(set(data));
    return data;
  }
}

export const unsetPoll = () => async (dispatch) => {
  dispatch(unset())
}

export const createPoll = (payload) => async (dispatch) => {
  const res = await fetch('/api/polls/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "question": payload.question,
      "user_id": payload.user_id,
      "options": payload.options
    })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(set(data));
    if (data.errors) {
      return data.errors;
    }
    return data;
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const editPoll = (payload, id) => async (dispatch) => {
  console.log('payload at input:', payload.options)
  const res = await fetch(`/api/polls/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "question": payload.question,
      "user_id": payload.user_id,
      "options": payload.options
    })
  })
  if (res.ok) {
    const data = await res.json();
    console.log('res.json:', data)
    dispatch(set(data));
    if (data.errors) {
      return data.errors;
    }
    return data;
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const votePoll = (payload) => async (dispatch) => {
  const res = await fetch(`/api/votes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "poll_id": payload.poll_id,
      "user_id": payload.user_id,
      "option_id": payload.option_id
    })
  })
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    return data;
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const deletePoll = (id) => async (dispatch) => {
  const res = await fetch(`/api/polls/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    return data;
  } else {
    return ['An error occurred. Please try again.']
  }
}

const initialState = { question: '', options: ['', '', ''] }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POLL:
      return { ...action.payload }
    case UNSET_POLL:
      return initialState
    default:
      return state;
  }
}