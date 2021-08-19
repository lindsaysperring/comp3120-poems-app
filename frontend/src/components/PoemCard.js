import { Link } from "react-router-dom";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function PoemCard({ id, text, title, author, ...props }) {
  return (
    <Link to={`/poem/${id}`} class="poemCard">
      <ReactMarkdown>{text.length > 200 ? `${text.substr(0, 200)} ...` : text}</ReactMarkdown>
      <h4>{title}</h4>
      <p>
        By <b>{author}</b>
      </p>
    </Link>
  );
}
