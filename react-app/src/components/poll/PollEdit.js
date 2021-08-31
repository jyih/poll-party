import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as pollActions from "../../store/polls"

const PollEdit = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(state => state.session.user)
  const poll = useSelector(state => state.poll)
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState(poll.question);
  const [options, setOptions] = useState(poll.options);

  useEffect(() => {
    (async () => {
      await dispatch(pollActions.getPoll(params.pollId))
    })()
  }, [dispatch, params])

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      history.push(`/polls/${data?.id}`)
      handleCancel(e)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(pollActions.deletePoll)
    history.push(`/`)
  }

  const updateOptions = (e, index) => {
    let option = e.target.value;
    let newOptions = options.map(option => option.answer ? option.answer : option);
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

  const answerOptions = options.map((option, i) => {
    return (
      <div key={i}>
        <input
          name={`option ${i}`}
          value={option.answer}
          required={i < 2}
          maxLength='255'
          placeholder='Type an answer option...'
          onChange={(e) => updateOptions(e, i)}
        />
        {` Chars. remaining: ${255 - (option.answer ? option.answer.length : option.length)}`}
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
        <button onClick={e => addOption(e, options.length)}>Add Option</button>
        <div>
          <button onClick={e => handleSubmit(e)}>Save Changes</button>
          <button type='button' onClick={e => handleDelete(e)}>Delete Post</button>
          <button type='button' onClick={e => handleCancel(e)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default PollEdit;