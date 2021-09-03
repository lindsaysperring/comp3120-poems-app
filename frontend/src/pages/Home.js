import React, { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import PoemCard from "../components/PoemCard";
import axios from "axios";

export default function Home() {
  const [poems, setPoems] = useState({
    poems: [],
    totalPages: 1,
    status: "idle",
    error: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("/api/poems?page=1")
      .then((res) => {
        setPoems({
          ...poems,
          poems: res.data.data,
          status: "success",
          totalPages: res.data.totalPages,
        });
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

  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > poems.totalPages) return
    axios
      .get(`/api/poems?page=${pageNumber}`)
      .then((res) => {
        setPoems({
          ...poems,
          poems: res.data.data,
          status: "success",
          totalPages: res.data.totalPages,  
        });
        setCurrentPage(pageNumber)
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
  }

  return (
    <div>
      <h1>Awesome Poems</h1>
      <div className="poemGridContainer">
        {poems.poems.map((poem) => (
          <PoemCard
            key={poem.id}
            id={poem.id}
            title={poem.title}
            author={poem.author}
            text={poem.text}
            votes={poem.votes}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={poems.totalPages} changePage={changePage}/>
    </div>
  );
}
