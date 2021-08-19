import React from "react";

export default function PoemCard({ text, title, author }) {
  return (
    <div class="poemCard">
      <p>{text.substr(0, 200) + " ..."}</p>
      <h4>{title}</h4>
      <p>
        By <b>{author}</b>
      </p>
    </div>
  );
}
