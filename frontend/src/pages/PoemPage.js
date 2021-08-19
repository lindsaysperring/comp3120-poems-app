import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function PoemPage(props) {
  const { id } = useParams();
  const [poem, setPoem] = useState({
    poem: { title: "", author: "", text: "" },
    status: "idle",
    error: null,
  });

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/poems/${id}`)
      .then((res) => {
        setPoem({ poem: res.data, status: "success", error: null });
      })
      // From  https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {poem.status === "success" && (
        <div>
          <h3>{poem.poem.title}</h3>
          <p>By <b>{poem.poem.author}</b></p>
          <br />
          <ReactMarkdown>{poem.poem.text}</ReactMarkdown>
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
    </>
  );
}
