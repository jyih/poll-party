import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as pollActions from "../../store/polls"

const PollResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const poll = useSelector(state => state.poll)
  const options = Object.values(poll.options).sort((a, b) => a.count > b.count);

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
      {options?.map((option, i) => (
        <div key={i}>
          <div className='results-row'>
            <div>
              {option?.answer}
            </div>
            <div>
              {((option.count / poll.total_votes) * 100).toFixed(2)}% ({option?.count} votes)
            </div>
            {/* <div>
              Insert Vote Bar
            </div> */}
          </div>
        </div>
      ))}
      <div className='form-button-container'>
        <button className='form-button' onClick={e => handleOnClick(e)}>Back to Poll</button>
      </div>
    </div>
  );
}

export default PollResults;