import React from "react";
import { NavLink } from "react-router-dom";

const PollList = ({ polls }) => {
  return (
    <>
      <div>
        <strong>
          List of Polls:
        </strong>
        {polls?.map(poll => (
          <div key={poll.id}>
            <NavLink to={`/polls/${poll.id}`}>
              {poll.question}
            </NavLink>
          </div>
        ))}
      </div>
    </>
  )
};

export default PollList;