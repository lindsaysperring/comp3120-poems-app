import React, { useEffect, useState } from "react";

import PoemCard from "../components/PoemCard";
import axios from "axios";

export default function Home() {
  const [poems, setPoems] = useState({
    poems: [],
    status: "idle",
    error: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/poems")
      .then((res) => {
        setPoems({ ...poems, poems: res.data, status: "success" });
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
  }, []);
  return (
    <div>
      <h1>Awesome Poems</h1>
      <div className="poemGridContainer">
        {poems.poems.map((poem) => (
          <PoemCard title={poem.title} author={poem.author} text={poem.text} />
        ))}
      </div>
    </div>
  );
}
