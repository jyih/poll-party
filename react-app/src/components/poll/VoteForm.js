import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as pollActions from "../../store/poll"
import * as sessionActions from "../../store/session"
import ErrorPage from '../ErrorPage';
import PollEditModal from './PollEditModal';

const VoteForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(state => state.session.user);
  const poll = useSelector(state => state.poll);
  const options = poll?.options ? Object.values(poll.options) : [];
  const [selectedOption, setSelectedOption] = useState(
    user.votes[poll.id]?.option_id
  );
  const [error, setError] = useState('')
  const [errorPage, setErrorPage] = useState(false)

  useEffect(() => {
    (async () => {
      const data = await dispatch(pollActions.getPoll(params?.pollId))
      if (data.errors) {
        setErrorPage(true)
      }
    })()
    setSelectedOption(user.votes[params?.pollId]?.option_id)
  }, [dispatch, params, user.votes])

  const handleVote = async (e) => {
    e.preventDefault()
    if (!selectedOption) {
      return setError('Must choose an option to vote')
    } else {
      await dispatch(pollActions.votePoll({
        'user_id': user.id,
        'poll_id': params.pollId,
        'option_id': selectedOption,
      }));
      await dispatch(sessionActions.authenticate())
      handleResults(e);
    }
  }

  const handleResults = (e) => {
    e.preventDefault()
    history.push(`/polls/${params.pollId}/results`)
  }

  // const handleEdit = (e) => {
  //   e.preventDefault()
  //   history.push(`/polls/${params.pollId}/edit`)
  // }

  const handleToLogin = (e) => {
    e.preventDefault()
    history.push(`/login`)
  }

  return (
    <>{errorPage ? <ErrorPage /> :
      <div className='form-container vote'>
      <h1 className='form-title'>Vote!</h1>
      <h3 className='poll-question'>{poll?.question}</h3>
      <div>Choose one option:</div>
      <form className='form-proper' onSubmit={handleVote}>
        {error &&
          <div className='error-message'>{error}</div>
        }
        {options?.map((option, idx) => (
          <div className='vote-option-container' key={idx} >
            <label htmlFor={`option${option.id}`}>
              <input
                type="radio"
                name='poll-option'
                id={`option${option.id}`}
                value={option.id}
                required={true}
                checked={parseInt(selectedOption) === parseInt(option.id)}
                onChange={e => setSelectedOption(e.target.value)}
              /> {option.answer}
            </label>
          </div>
        ))}
      </form>
      <div className='form-button-container row'>
        <div className='form-button-container left'>
          <div className='form-button-container'>
            {user
              ? <button className='form-button button-primary' type='submit' onClick={e => handleVote(e)}>Vote</button>
              : <button className='form-button button-primary' type='button' onClick={e => handleToLogin(e)}>Log In to Vote</button>
            }
          </div>
        </div>
        <div className='form-button-container right'>
          <div className='form-button-container'>
            <button className='form-button' type='button' onClick={e => handleResults(e)}>Results</button>
          </div>
          {parseInt(user?.id) === parseInt(poll?.user_id) &&
            <PollEditModal />
          }
        </div>
        {/* <button className='form-button' onClick={e => handleEdit(e)}>Edit</button> */}
      </div >
    </div >
    }</>
  );
}

export default VoteForm;