import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as pollActions from "../../store/polls"

const PollForm = ({ createPoll = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(state => state.session.user)
  const poll = useSelector(state => state.poll)
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState(poll.question);
  const [answers, setAnswers] = useState(poll.answers.map(answer => answer.answer));

  useEffect(() => {
    if (params) {
      (async () => {
        if (createPoll)
          await dispatch(pollActions.getPoll(params.pollId))
        else
          await dispatch(pollActions.noPoll())
      })()
    }
  }, [dispatch, params])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(pollActions.createPoll({
      'user_id': user.id,
      'question': question,
      'answers': answers,
    }));
    if (data?.errors) {
      setErrors(data.errors);
    } else if (data?.id) {
      history.push(`/polls/${data?.id}`)
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/polls/${params.pollId}`)
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
          {answers?.map((answer, i) => {
            return (
              <div key={i}>
                <input
                  name={`answer ${i}`}
                  value={answer}
                  required={i < 2}
                  maxLength='255'
                  placeholder='Type an answer option...'
                  onChange={(e, index = i) => updateAnswers(e, index)}
                  onClick={(e, index = i) => createPoll ? addAnswer(e, index) : null}
                />
              </div>
            )
          })}
        </div>
        {(createPoll)
          ? <button>Create Poll</button>
          : (
            <div>
              <button onClick={e => addAnswer(e, answers.length - 1)}>Add Option</button>
              <div>
                <button onClick={e => handleSubmit(e)}>Save Changes</button>
                <button onClick={e => handleCancel(e)}>Cancel</button>
              </div>
            </div>
          )
        }
      </form>
    </div>
  )
}

export default PollForm;