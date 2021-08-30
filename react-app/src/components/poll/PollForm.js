import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as pollActions from "../../store/polls"

const PollForm = ({ poll = { question: '', answers: ['', '', ''] } }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState(poll.question);
  const [answers, setAnswers] = useState(poll.answers);

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const data = await dispatch(pollActions.createPoll({
      'user_id': user.id,
      'question': question,
      'answers': answers,
    }));
    console.log('return from dispatch:', data)
    if (data?.errors) {
      setErrors(data.errors);
    } else if (data?.id) {
      history.push(`/polls/${data?.id}`)
    }
  }

  const updateAnswers = (e, index) => {
    let answer = e.target.value;
    let newAnswers = [...answers];
    newAnswers[index] = answer;
    return setAnswers(newAnswers);
  }

  const addAnswer = (e, index) => {
    if (index === answers.length - 1) {
      let newAnswers = [...answers, '']
      return setAnswers(newAnswers);
    }
  }

  return (
    <div>
      <form onSubmit={handleCreatePoll}>
        <label>{errors?.question}</label>
        <label>Title</label>
        <input
          name='question'
          type='text'
          value={question}
          required={true}
          placeholder='Type your question here...'
          onChange={e => setQuestion(e.target.value)}
        />
        {/* {answerError &&
          <label>Answer length cannot exceed 255 characters.</label>
        } */}
        <label>Answer Options</label>
        {answers.map((answer, i) => {
          return <input
            key={i}
            name={`answer ${i}`}
            value={answer}
            required={i < 2}
            maxLength='255'
            placeholder='Type an answer option...'
            onChange={(e, index = i) => updateAnswers(e, index)}
            onClick={(e, index = i) => addAnswer(e, index)}
          />
        })}
        <button>Create Poll</button>
      </form>
    </div>
  )
}

export default PollForm;