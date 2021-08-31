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
  const [poll, setPoll] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(0)
  // const [previousAnswer, setPreviousAnswer] = useState(0)
  // const [refresh, setRefresh] = useState(true)


  useEffect(() => {
    (async () => {
      const data = await dispatch(pollActions.getPoll(params.pollId))
      setPoll(data)
    })()
  }, [dispatch, params, user?.votes])

  const handleVote = async (e) => {
    e.preventDefault()
    const data = await dispatch(pollActions.votePoll({
      'user_id': user.id,
      'poll_id': params.pollId,
      'answer_id': selectedAnswer,
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
    <div>
      <div>{poll?.question}</div>
      <div>Choose one answer:</div>
      <form onSubmit={handleVote}>
        {poll?.answers?.map(answer => (
          <div key={answer.id} >
            <input
              type="radio"
              name='poll-answer'
              id={`answer${answer.id}`}
              value={answer.id}
              required
              // checked={selectedAnswer === answer.id}
              onChange={e => setSelectedAnswer(e.target.value)}
            />
            {answer.answer}
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