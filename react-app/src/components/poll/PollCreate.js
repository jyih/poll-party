import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import PollForm from "./PollForm";
import * as pollActions from "../../store/polls"

const PollCreate = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const params = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(pollActions.noPoll())
    })()
  }, [dispatch])

  return (
    <>
      <PollForm />
      <button>Create Poll</button>
    </>
  )
}

export default PollCreate;