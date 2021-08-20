import React, { useState } from "react";

import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function PoemCard({ id, text, title, author, votes, ...props }) {
  const history = useHistory();
  const [votesState, setVotes] = useState(votes);

  const upDootHandler = (e) => {
    e.stopPropagation();
    axios
      .patch(`http://localhost:3001/api/poems/${id}`, {votes: votesState+1})
      .then((res) => {
        setVotes(res.data.votes);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error);
      });
  };

  return (
    <div
      onClick={() => {
        history.push(`/poem/${id}`);
      }}
      class="poemCard"
    >
      <ReactMarkdown>
        {text.length > 200 ? `${text.substr(0, 200)} ...` : text}
      </ReactMarkdown>
      <span className="stayOnDaBottom">
      <h4>{title}</h4>
      <p>
        By <b>{author}</b>
      </p>

      <div className="upDootContainer">
        <img
          className="updoot"
          src="/assets/up-arrow-hand-drawn-outline-svgrepo-com.svg"
          alt="Up arrow"
          onClick={upDootHandler}
        />
        <span className="upDootCount">{votesState}</span>
      </div>
      </span>
    </div>
  );
}
