import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as pollActions from "../../store/poll"
import PollEditModal from './PollEditModal';

const VoteForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(state => state.session.user);
  const poll = useSelector(state => state.poll);
  // const options = Object.values(poll.options);
  const options = poll.options ? Object.values(poll.options) : [];
  // const options = poll.options;
  // const [options, setOptions] = useState(poll.options ? Object.values(poll.options) : [])
  const [selectedOption, setSelectedOption] = useState(0);
  // const [refresh, setRefresh] = useState(true);


  useEffect(() => {
    (async () => {
      await dispatch(pollActions.getPoll(params?.pollId))
    })()
    // setOptions(Object.values(poll.options))
    // console.log('options', options)
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
      <form className='form-proper' onSubmit={handleVote}>
        {options?.map((option, idx) => (
          <div key={idx} >
            <label htmlFor={`option${option.id}`}>
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
          <PollEditModal />
        </div>
        {/* <button className='form-button' onClick={e => handleEdit(e)}>Edit</button> */}
      </div >
    </div >
  );
}

export default VoteForm;