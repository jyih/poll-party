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
    <div className='form-container'>

      <div className='form-title'>Results</div>
      <div>
        {poll?.question}
      </div>
      {poll?.options?.map(option => (
        <div key={option.id}>
          <p className='results-row'>
            <div key={option.answer}>
              Option: {option.answer}
            </div>
            <div key={option.votes?.length}>
              Votes: {option.votes?.length}
            </div>
            {/* <div>
              Insert Vote Bar
            </div> */}
          </p>
        </div>
      ))}
      <div className='form-button-container'>
        <button className='form-button' onClick={e => handleOnClick(e)}>Back to Poll</button>
      </div>
    </div>
  );
}

export default PollResults;