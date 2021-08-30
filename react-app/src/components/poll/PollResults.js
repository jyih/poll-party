import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as pollActions from "../../store/polls"


const PollResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [poll, setPoll] = useState({});
  // const poll = useSelector(state => state.polls.current)

  useEffect(() => {
    if (!params) {
      return;
    }
    // const data = await dispatch(pollActions.getPoll(params.pollId))
    (async () => {
      const res = await fetch(`/api/polls/${params.pollId}`)
      const data = await res.json();
      console.log('data:', data)
      setPoll(data)
    })()
  }, [params])

  useEffect(() => {
    console.log('poll state:', poll)
  }, [poll])

  return (
    <>
      <ul>
        <li>
          {poll?.question}
        </li>
        {poll?.answers?.map(answer => (
          <div key={answer.id}>
            <li>
              Answer: {answer?.answer}
            </li>
            <li>
              Votes: {answer?.votes.length}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default PollResults;