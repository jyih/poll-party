import React, { useEffect } from 'react';
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
      {/* <div> */}
      <div>
        {poll?.question}
      </div>
      {poll?.answers?.map(answer => (
        <ul key={answer.id}>
          <li key={answer.answer}>
            Answer: {answer.answer}
          </li>
          <li key={answer.votes?.length}>
            Votes: {answer.votes?.length}
          </li>
        </ul>
      ))}
      {/* </div> */}
      <button onClick={e => handleOnClick(e)}>Back to Poll</button>
    </>
  );
}

export default PollResults;