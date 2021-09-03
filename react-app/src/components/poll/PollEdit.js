import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as pollActions from "../../store/poll"

const PollEdit = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(state => state.session.user)
  const poll = useSelector(state => state.poll)
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState(poll?.question);
  const [options, setOptions] = useState(Object.values(poll?.options).map(option => option.answer));
  // const [options, setOptions] = useState(['', '', '']);
  // const mappedOptions = [...poll?.options?.map(option => option.answer)]

  useEffect(() => {
    (async () => {
      await dispatch(pollActions.getPoll(params.pollId))
    })()
  }, [dispatch, params])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) {
      setErrors({ 'question': 'Poll question cannot be empty.' })
      setQuestion((poll?.question))
    } else {
      const payload = {
        'user_id': user.id,
        'question': question,
        'options': options,
      }
      const data = await dispatch(pollActions.editPoll(payload, params.pollId));
      if (data?.errors) {
        setErrors(data.errors);
      }
      else {
        handleCancel(e)
      }
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(pollActions.deletePoll(params.pollId))
    history.push(`/`)
  }

  const updateOptions = (e, index) => {
    let option = e.target.value;
    if (!option) {
      let answerErrors = { ...errors.answers };
      answerErrors[index] = 'Answer option cannot be blank.'
      return setErrors({ ...errors, 'answers': answerErrors })
    }

    // else if (!options) {
    //   setErrors({ 'answers': 'Poll must contain at least 2 options.' })
    //   setOptions(Object.values(poll?.options).map(option => option.answer))
    // }
    let newOptions = options.slice();
    newOptions[index] = option;
    return setOptions(newOptions);
  }

  const addOption = (e, index) => {
    e.preventDefault()
    if (index >= options.length - 1) {
      let newOptions = [...options, '']
      return setOptions(newOptions);
    }
  }

  const answerOptions = options.map((answer, i) => {
    return (
      <div className='form-input-container labeled side' key={i}>
        {errors?.answers &&
          <label className='error-message' >{errors.answers[i]}</label>
        }
        <label className='form-label side'>
          <input
            className='form-input side-label'
            name={`option ${i}`}
            value={answer}
            // required={i < 2}
            required={true}
            maxLength='255'
            placeholder='Type an answer option...'
            onChange={(e) => updateOptions(e, i)}
          />
          {` chars. ${255 - answer?.length}/255`}
        </label>
      </div>
    )
  })

  return (
    <div className='form-container form-edit'>
      <form className='form-proper' onSubmit={handleSubmit}>
        <label className='error-message' >{errors?.question}</label>
        <label>Title</label>
        <div>
          <input
            name='question'
            type='text'
            value={question}
            required
            minLength={1}
            placeholder='Type your question here...'
            onChange={e => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Answer Options</label>
          {answerOptions}
        </div>
        <div className='form-button-container'>
          <button
            className='form-button'
            type='button'
            onClick={e => addOption(e, options.length)}
          >Add Option</button>
        </div>
      </form>
      <div className='form-button-container row'>
        <div className='form-button-container left' >
          <button
            className='form-button button-primary'
            type='submit'
            onClick={(e) => handleSubmit(e)}
          >Save Changes</button>
        </div>
        <div className='form-button-container right' >
          <button
            className='form-button button-caution'
            type='button'
            onClick={e => handleDelete(e)}
          >Delete Post</button>
          <button
            className='form-button'
            type='button'
            onClick={e => handleCancel(e)}
          >Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PollEdit;