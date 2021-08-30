import React, {
  // useEffect, useState
} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PollForm from "./PollForm";
// import * as pollActions from "../../store/polls"

const PollEdit = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  // const poll = useSelector(state => state.poll)

  // useEffect(() => {
  //   (async () => {
  //     await dispatch(pollActions.getPoll(params.pollId))
  //   })()
  // }, [dispatch, params])

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/polls/${params.pollId}`)
  }

  return (
    <>
      <PollForm />
      <button>Save Changes</button>
      <button onClick={e => handleCancel(e)}>Cancel</button>
    </>
  )
}

export default PollEdit;