import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as pollActions from "../../store/poll"

const PollResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const poll = useSelector(state => state.poll)
  const options = Object.values(poll.options).sort((a, b) => a.count > b.count);
  const user = useSelector(state => state.session.user);
  const selectedOption = user.votes[poll.id]?.option_id;


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
      <h1 className='form-title'>Results</h1>
      <h3 className='poll-question'>{poll?.question}</h3>
      {options?.map((option, i) => (
        <div key={i}>
          <div className='results-row'>
            <div className='option-container'>
              {selectedOption == option.id &&
                <img alt='check-mark' src='https://upload.wikimedia.org/wikipedia/commons/e/e0/Eo_circle_light-blue_checkmark.svg' />
              }
              {option?.answer}
            </div>
            <div>
              <span className='vote-percentage'>
                {poll.total_votes ? ((option.count / poll.total_votes) * 100).toFixed(2) : 0}%
              </span> ({option?.count} votes)
            </div>
            {/* <div>
              Insert Vote Bar
            </div> */}
          </div>
        </div>
      ))}
      <div className='vote-total'>
        Total Votes: {poll.total_votes}
      </div>
      <div className='form-button-container'>
        <button className='form-button' onClick={e => handleOnClick(e)}>Back to Poll</button>
      </div>
    </div>
  );
}

export default PollResults;