import { Link } from "react-router-dom";
import React from "react";

export default function PoemCard({ id, text, title, author, ...props }) {
  return (
    <Link to={`/poem/${id}`} class="poemCard">
      <p>{text.substr(0, 200) + " ..."}</p>
      <h4>{title}</h4>
      <p>
        By <b>{author}</b>
      </p>
    </Link>
  );
}
