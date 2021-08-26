import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PollForm = () => {
  const [errors, setErrors] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', ''])

  const handleCreatePoll = async e => {
    e.preventDefault();
  }


  return (
    <form onSubmit={handleCreatePoll}>
      <div>
        {errors.map((error, ind) => (
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
            placeholder='Choose an answer...'
            onChange={(e, index = i) => {
              console.log(index)
              let newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              return setAnswers(newAnswers);
            }}
            onClick={(e, index = i) => {
              if (index == answers.length - 1) {
                let newAnswers = [...answers, '']
                return setAnswers(newAnswers);
              }
            }}
          />
        })}
        <button>Create Poll</button>
      </div>

    </form>
  )
}

export default PollForm;