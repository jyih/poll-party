import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as pollActions from "../../store/polls"
import PollEditModal from './PollEditModal';

const VoteForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(state => state.session.user)
  const poll = useSelector(state => state.poll)
  const [selectedOption, setSelectedOption] = useState(0)
  const [refresh, setRefresh] = useState(true)


  useEffect(() => {
    (async () => {
      await dispatch(pollActions.getPoll(params.pollId))
    })()
  }, [dispatch, params])

  const handleVote = async (e) => {
    e.preventDefault()
    const data = await dispatch(pollActions.votePoll({
      'user_id': user.id,
      'poll_id': params.pollId,
      'option_id': selectedOption,
    }));
    console.log(data)
    handleResults(e);
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
    <div className='form-container'>
      <div className='form-title'>Vote!</div>
      <div>{poll?.question}</div>
      <div>Choose one option:</div>
      <form onSubmit={handleVote}>
        {poll?.options?.map(option => (
          <div key={option.id} >
            <label for={`option${option.id}`}>
              <input
                type="radio"
                name='poll-option'
                id={`option${option.id}`}
                value={option.id}
                required
                onChange={e => setSelectedOption(e.target.value)}
              />
              {option.answer}
            </label>
          </div>
        ))}
        {user
          ? <button type='submit'>Vote</button>
          : <button onClick={e => handleToLogin(e)}>Log In to Vote</button>
        }
      </form>
      <button onClick={e => handleResults(e)}>Results</button>
      {/* <button onClick={e => handleEdit(e)}>Edit</button> */}
      <PollEditModal />
    </div >
  );
}

export default VoteForm;