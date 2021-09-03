import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as pollActions from "../../store/poll"

const PollCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      'user_id': user.id,
      'question': question,
      'options': options,
    }
    const data = await dispatch(pollActions.createPoll(payload))

    if (data?.errors) {
      setErrors(data.errors);
    } else if (data?.id) {
      history.push(`/polls/${data?.id}`)
    }
  }

  const updateOptions = (e, index) => {
    let option = e.target.value;
    let newOptions = [...options];
    newOptions[index] = option;
    return setOptions(newOptions);
  }

  const addOption = (e, index) => {
    e.preventDefault()
    if (index === options.length - 1) {
      let newOptions = [...options, '']
      return setOptions(newOptions);
    }
  }

  const answerOptions = options.map((answer, i) => {
    return (
      <div className='form-input-container labeled side' key={i}>
        <label className='form-label side'>
          <input
            className='form-input side-label'
            name={`option ${i}`}
            value={answer}
            required={i < 2}
            maxLength='255'
            placeholder='Type an answer option...'
            onChange={(e) => updateOptions(e, i)}
            onClick={(e) => addOption(e, i)}
          />
          {` chars. ${255 - answer?.length}/255`}
        </label>
      </div>
    )
  })

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label className='error-message' >{errors?.question}</label>
        <label>Title</label>
        <div>
          <textarea
            name='question'
            // type='text'
            value={question}
            required={true}
            maxLength='255'
            placeholder='Type your question here...'
            onChange={e => setQuestion(e.target.value)}
          />
          {` chars. ${255 - question?.length}/255`}
        </div>
        <div>
          <label>Answer Options</label>
          {answerOptions}
        </div>
        <div className='form-button-container'>
          <button type='submit' className='form-button button-primary'>Create Poll</button>
        </div>
      </form>
    </div>
  )
}

export default PollCreate;