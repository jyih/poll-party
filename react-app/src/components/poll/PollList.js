import React from "react";
import { NavLink } from "react-router-dom";

const PollList = ({ polls }) => {
  return (
    <>
      <strong>
        List of Polls:
      </strong>
      {polls?.length
        ?
        <div>
          {polls?.map((poll, i) => (
            <div key={i}>
              <NavLink to={`/polls/${poll.id}`}>
                {poll.question}
              </NavLink>
            </div>
          ))}
        </div>
        :
        <div>
          (User has not created any polls)
        </div>
      }
    </>
  )
};

export default PollList;