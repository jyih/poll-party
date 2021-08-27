import { bindActionCreators } from "redux";

// const CREATE = 'poll/CREATE';

// const createPoll = (poll) => ({
//   type: CREATE,
//   payload: poll
// })

export const createPoll = (payload) => async (dispatch) => {
  let poll_id
  const res = await fetch('/api/polls/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "question": payload.question,
      "user_id": payload.user_id
    })
  })

  // const res = await fetch('/api/answers/', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     "question": payload.question,
  //     "user_id": payload.user_id
  //   })
  // })

  // Promise.all(payload.answers.map(answer => fetch('/api/answers/', {
  //   method: 'POST',
  //   headers: {}
  // })))

  // for (let answer in payload.answers) {
  //   const res = await fetch('/api/answers/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       "answer": answer,
  //       "poll_id": poll.id
  //     })
  //   })

  //   if (res.ok) {
  //     continue
  //   }
  // }

  if (res.ok) {
    const data = await res.json()
    console.log("logging data", data)
    // return data
  }
  else if (!res.ok) {
    const data = res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  // else {
  //   return ['An error occurred. Please try again.'];
  // }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}