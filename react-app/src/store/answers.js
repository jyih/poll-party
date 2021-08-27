
export const createAnswers = (payload) => async (dispatch) => {
  const res = await fetch('/api/answers/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "answers": payload
    })
  })

  if (res.ok) {
    const data = await res.json()
    // console.log("logging data", data)
    return data
  } else if (res.status < 500) {
    const data = await res.json();
    console.log("logging data", data)
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}