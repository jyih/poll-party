
const SET_POLL = 'poll/SET_POLL';
const UNSET_POLL = 'poll/UNSET_POLL';

const set = (poll) => ({
  type: SET_POLL,
  payload: poll
})

const unset = () => ({
  type: UNSET_POLL
})

export const getPoll = (payload) => async (dispatch) => {
  const res = await fetch(`/api/polls/${payload}`)

  if (res.ok) {
    const data = await res.json()
    if (data.errors) {
      return;
    }
    dispatch(set(data));
    return data;
  }
}

export const noPoll = () => async (dispatch) => {
  dispatch(unset())
}

export const createPoll = (payload) => async (dispatch) => {
  const res = await fetch('/api/polls/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "question": payload.question,
      "user_id": payload.user_id,
      "answers": payload.answers
    })
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(set(data))
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
      "answer_id": payload.answer_id
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

const initialState = { question: '', answers: ['', '', ''] }

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