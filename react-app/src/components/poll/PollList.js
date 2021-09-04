import React from "react";
import { NavLink } from "react-router-dom";

const PollList = ({ polls }) => {
  return (
    <>
      {polls?.length
        ?
        <div>
          {polls?.map((poll, i) => (
            <div key={i}>
              <NavLink className='poll-link' to={`/polls/${poll.id}`}>
                {poll.question}
              </NavLink>
            </div>
          ))}
        </div>
        :
        <div>
          (No polls created)
        </div>
      }
    </>
  )
};

export default PollList;