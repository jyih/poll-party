import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as pollActions from "../../store/polls"

const PollCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      'user_id': user.id,
      'question': question,
      'answers': answers,
    }
    const data = await dispatch(pollActions.createPoll(payload))

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
    e.preventDefault()
    if (index === answers.length - 1) {
      let newAnswers = [...answers, '']
      return setAnswers(newAnswers);
    }
  }

  const answerOptions = answers.map((answer, i) => {
    return (
      <div key={i}>
        <input
          name={`answer ${i}`}
          value={answer}
          required={i < 2}
          maxLength='255'
          placeholder='Type an answer option...'
          onChange={(e) => updateAnswers(e, i)}
          onClick={(e) => addAnswer(e, i)}
        />
      </div>
    )
  })

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{errors?.question}</label>
        <label>Title</label>
        <div>
          <input
            name='question'
            type='text'
            value={question}
            required={true}
            placeholder='Type your question here...'
            onChange={e => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Answer Options</label>
          {answerOptions}
        </div>
        <button>Create Poll</button>
      </form>
    </div>
  )
}

export default PollCreate;