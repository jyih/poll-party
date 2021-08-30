import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as pollActions from "../../store/polls"

const PollResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const poll = useSelector(state => state.poll)

  useEffect(() => {
    (async () => {
      await dispatch(pollActions.getPoll(params.pollId))
    })()
  }, [dispatch, params])

  const handleOnClick = (e) => {
    e.preventDefault();
    history.push(`/polls/${params.pollId}`)
  }

  return (
    <>
      <div>Results</div>
      <ul>
        <li>
          {poll?.question}
        </li>
        {poll?.answers?.map(answer => (
          <div key={answer.id}>
            <li>
              Answer: {answer?.answer}
            </li>
            <li>
              Votes: {answer?.votes?.length}
            </li>
          </div>
        ))}
      </ul>
      <button onClick={e => handleOnClick(e)}>Back to Poll</button>
    </>
  );
}

export default PollResults;