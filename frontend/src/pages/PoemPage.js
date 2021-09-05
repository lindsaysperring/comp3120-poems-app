import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function PoemPage(props) {
  // Get poem ID and set initial state
  const { id } = useParams();
  const [poem, setPoem] = useState({
    poem: { title: "", author: "", text: "", votes: "" },
    status: "idle",
    error: null,
  });

  const history = useHistory();

  // Add votes
  const upDootHandler = (e) => {
    e.stopPropagation();
    axios
      .post(`/api/poems/${id}`)
      .then((res) => {
        setPoem({ ...poem, poem: { ...poem.poem, votes: res.data.votes } });
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

  useEffect(() => {
    // Set loading status
    setPoem({ ...poem, error: null, status: "loading" });

    // Get Poem
    axios
      .get(`/api/poems/${id}`)
      .then((res) => {
        setPoem({ poem: res.data, status: "success", error: null });
      })
      // From  https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setPoem({
            ...poem,
            status: "error",
            error: error.response.data.error
              ? error.response.data.error
              : error.response.data,
          });
        } else if (error.request) {
          setPoem({ ...poem, status: "error", error: "Something went Wrong" });
        } else {
          setPoem({ ...poem, status: "error", error: "Something went wrong" });
          console.log("Error", error.message);
        }
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {poem.status === "success" && (
        <div>
          <h3>{poem.poem.title}</h3>
          <p>
            By <b>{poem.poem.author}</b>
          </p>
          <br />
          <ReactMarkdown>{poem.poem.text}</ReactMarkdown>
          <br />
          <div className="upDootContainer">
            <img
              className="updoot"
              src="/assets/up-arrow-hand-drawn-outline-svgrepo-com.svg"
              alt="Up arrow"
              onClick={upDootHandler}
            />
            <span className="upDootCount">{poem.poem.votes}</span>
          </div>
          <br />
          <span
            className="backArrow"
            onClick={() => {
              history.goBack();
            }}
          >
            &#8592;
          </span>
        </div>
      )}
      {poem.status === "error" && <h3>{poem.error}</h3>}
      {poem.status === "loading" && <h3>Loading...</h3>}
    </>
  );
}
