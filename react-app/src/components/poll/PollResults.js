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
      {poll?.options?.map(option => (
        <ul key={option.id}>
          <li key={option.answer}>
            Option: {option.answer}
          </li>
          <li key={option.votes?.length}>
            Votes: {option.votes?.length}
          </li>
        </ul>
      ))}
      {/* </div> */}
      <button onClick={e => handleOnClick(e)}>Back to Poll</button>
    </>
  );
}

export default PollResults;