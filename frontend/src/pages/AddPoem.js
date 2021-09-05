import React, { useState } from "react";

import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialValues = { author: "", title: "", text: "" };
const initialStatus = { status: "idle", error: null };

export default function AddPoem() {
  const [inputs, setInputs] = useState(initialValues);
  const [status, setStatus] = useState(initialStatus);
  const history = useHistory();

  const fieldErrors = {
    title: "Please enter a poem title.",
    author: "Please enter an author",
    text: "Your poem cannot be empty",
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    for (const property in inputs) {
      if (inputs[property] === "") {
        errors.push(fieldErrors[property]);
      }
    }
    if (errors.length > 0) {
      return setStatus({ ...initialStatus, error: errors });
    }

    axios
      .post("/api/poems", inputs)
      .then((res) => {
        setStatus({ status: "success", error: null });
        setInputs(initialValues);
        history.push(`/poem/${res.data.id}`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setStatus({
            status: "error",
            error: error.response.data.error
              ? error.response.data.error
              : error.response.data,
          });
        } else if (error.request) {
          setStatus({ status: "error", error: "Something went wrong" });
          console.log(error.request);
        } else {
          setStatus({ status: "error", error: "Something went wrong" });
          console.log("Error", error.message);
        }
        console.log(error);
      });
  };

  const handleChange = (inputName, value) => {
    setInputs({ ...inputs, [inputName]: value });
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="six columns">
            <label htmlFor="author">Your Name</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="Bob Loblaw"
              id="author"
              name="author"
              value={inputs.author}
              onChange={(e) => {
                handleChange("author", e.target.value);
              }}
            />
          </div>
          <div className="six columns">
            <label htmlFor="title">Poem Title</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="Crazy Awesome Title"
              id="title"
              name="title"
              value={inputs.title}
              onChange={(e) => {
                handleChange("title", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <label htmlFor="poemContent">Poem Content</label>
            <textarea
              className="u-full-width"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus."
              id="poemContent"
              name="poemContent"
              value={inputs.text}
              onChange={(e) => {
                handleChange("text", e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <input className="darkButton" type="submit" value="Submit"></input>
      </form>

      {status.status === "success" && <p>Poem added Successfully</p>}
      {status.error && (
        <div className="error">
          {status.error &&
            Array.isArray(status.error) &&
            status.error.map((error) => <p className="error">{error}</p>)}
          {status.error && !Array.isArray(status.error) && (
            <p className="error">{status.error}</p>
          )}
        </div>
      )}

      <p>Preview:</p>
      <ReactMarkdown className="markdownPreview">{inputs.text}</ReactMarkdown>
    </div>
  );
}
