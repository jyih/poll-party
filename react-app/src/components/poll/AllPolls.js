import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PollList from '../poll/PollList'
import * as pollsActions from "../../store/all_polls"

const AllPolls = () => {
  // const [polls, setPolls] = useState([]);
  const dispatch = useDispatch()
  const polls = useSelector(state => Object.values(state.all_polls))
  // const [polls, setPolls] = useState(Object.values(pollsState))

  useEffect(() => {
    // (async () => {
    //   const response = await fetch(`/api/polls/`);
    //   const data = await response.json();
    //   setPolls(data.polls);
    // })();
    (async () => {
      await dispatch(pollsActions.getPolls())
    })()
  }, [dispatch])

  return (
    <>
      <div className='list-container'>
        <div className='title'>
          <strong>List of Polls:</strong>
        </div>
        <div className='list'>
          <PollList polls={polls} />
        </div>
      </div>
    </>
  )
};

export default AllPolls;