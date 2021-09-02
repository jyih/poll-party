import React, { useEffect, useState } from "react";
import PollList from '../poll/PollList'

const AllPolls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/polls`);
      const data = await response.json();
      setPolls(data.polls);
    })();
  })

  return (
    <>
      <div>
        <div>
          <PollList polls={polls} />
        </div>
      </div>
    </>
  )
};

export default AllPolls;