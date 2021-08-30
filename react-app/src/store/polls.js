
const SET_POLL = 'poll/SET_POLL';

const current = (poll) => ({
  type: SET_POLL,
  payload: poll
})

export const getPoll = (payload) => async (dispatch) => {
  const res = await fetch(`/api/polls/${payload}`)

  if (res.ok) {
    const data = await res.json()
    if (data.errors) {
      return;
    }

    dispatch(current(data));
  }
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
    if (data.errors) {
      return data.errors;
    }
    return data;
  } else {
    return ['An error occurred. Please try again.']
  }


  // if (res.ok) {
  //   const poll = await res.json();
  //   // dispatch(current(poll));
  //   return poll;
  // } else if (res.status < 500) {
  //   const data = await res.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ['An error occurred. Please try again.']
  // }
}

export const votePoll = (payload) => async (dispatch) => {
  const res = await fetch(`/api/polls/${payload.pollId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "question": payload.question,
      "user_id": payload.user_id,
      "answers": payload.answers
    })
  })

}


export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_POLL:
      return { current: action.payload }
    default:
      return state;
  }
}