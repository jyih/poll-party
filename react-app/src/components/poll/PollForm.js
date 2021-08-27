import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as pollActions from "../../store/polls"

const PollForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '']);

  const handleCreatePoll = async e => {
    e.preventDefault();
    const data = await dispatch(pollActions.createPoll({
      'user_id': user.id,
      'question': question,
      'answers': answers,
    }));
    if (data?.errors) {
      setErrors(data);
    }
  }

  const updateAnswers = (e, index) => {
    let newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    return setAnswers(newAnswers);
  }

  const addAnswer = (e, index) => {
    if (index == answers.length - 1) {
      let newAnswers = [...answers, '']
      return setAnswers(newAnswers);
    }
  }

  return (
    <form onSubmit={handleCreatePoll}>
      <div>
        {errors?.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Title</label>
        <input
          name='question'
          type='text'
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder='Type your question here...'
        />
        <label>Answer Options</label>
        {answers.map((answer, i) => {
          return <input
            key={i}
            name={`answer ${i}`}
            value={answer}
            placeholder='Type an answer option...'
            onChange={(e, index = i) => updateAnswers(e, index)}
            onClick={(e, index = i) => addAnswer(e, index)}
          />
        })}
        <button>Create Poll</button>
      </div>

    </form>
  )
}

export default PollForm;