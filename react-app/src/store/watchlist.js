const SET_WATCHLIST = 'watchlist/SET_WATCHLIST';
const UNSET_WATCHLIST = 'watchlist/UNSET_WATCHLIST';

const set = (watchlist) => ({
  type: SET_WATCHLIST,
  payload: watchlist
})

export const createWatchlist = (payload) => async (dispatch) => {
  const res = await fetch('/api/watchlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'user_id': payload.user_id,
      'poll_id': payload.poll_id
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

export const deleteWatchlist = (payload) => async (dispatch) => {
  const res = await fetch(`/api/watchlists/${payload.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(unset())
    if (data.errors) {
      return data.errors;
    }
    return data;
  } else {
    return ['An error occurred. Please try again.']
  }
}