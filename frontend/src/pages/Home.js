import React, { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import PoemCard from "../components/PoemCard";
import axios from "axios";
import { liveSearch } from "../utils/liveSearch";

export default function Home() {
  const [poems, setPoems] = useState({
    poems: [],
    totalPages: 1,
    status: "idle",
    error: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPoems({ ...poems, status: "loading" });
    axios
      .get("/api/poems?page=1")
      .then((res) => {
        setPoems({
          ...poems,
          poems: res.data.data,
          status: "success",
          totalPages: res.data.totalPages,
          error: null,
        });
      })
      // From  https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
      .catch((error) => {
        if (error.response) {
          setPoems({ ...poems, status: "error", error: error.response.data });
        } else if (error.request) {
          setPoems({
            ...poems,
            status: "error",
            error: "Something went Wrong",
          });
        } else {
          setPoems({
            ...poems,
            status: "error",
            error: "Something went Wrong",
          });
          console.log("Error", error.message);
        }
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > poems.totalPages) return;
    if (pageNumber === currentPage) return;
    const queryParams =
      search !== ""
        ? `page=${pageNumber}&search=${searchTerm}`
        : `page=${pageNumber}`;

    setPoems({ ...poems, error: null, status: "loading" });
    setCurrentPage(pageNumber);

    axios
      .get(`/api/poems?${queryParams}`)
      .then((res) => {
        setPoems({
          ...poems,
          poems: res.data.data,
          status: "success",
          totalPages: res.data.totalPages,
          error: null,
        });
      })
      // From  https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
      .catch((error) => {
        if (error.response) {
          setPoems({ ...poems, status: "error", error: error.response.data });
        } else if (error.request) {
          setPoems({
            ...poems,
            status: "error",
            error: "Something went Wrong",
          });
        } else {
          setPoems({
            ...poems,
            status: "error",
            error: "Something went Wrong",
          });
          console.log("Error", error.message);
        }
        console.log(error);
      });
  };

  const search = async (searchVal) => {
    setPoems({ ...poems, status: "loading" });
    const res = await liveSearch(`/api/poems?page=1&search=${searchVal}`);
    if (res == null) return;
    if (res != null && res.error === null && res.cancelled) return;
    setCurrentPage(1);
    if (res.error)
      return setPoems({
        ...poems,
        status: "error",
        error: res.error,
      });
    setPoems({
      ...poems,
      poems: res.data,
      status: "success",
      totalPages: res.totalPages,
    });
  };

  const searchHandler = (e) => {
    search(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Awesome Poems</h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search"
          onChange={searchHandler}
          value={searchTerm}
        />
      </div>
      <div className="poemGridContainer">
        {poems.status !== "loading" &&
          poems.error === null &&
          poems.poems.length > 0 &&
          poems.poems.map((poem) => (
            <PoemCard
              key={poem.id}
              id={poem.id}
              title={poem.title}
              author={poem.author}
              text={poem.text}
              votes={poem.votes}
            />
          ))}
        {poems.status !== "loading" &&
          poems.error === null &&
          poems.poems.length === 0 && <h3>No Poems Found </h3>}
        {poems.status === "loading" && poems.error === null && (
          <h3>Loading...</h3>
        )}
        {poems.status !== "loading" && poems.error !== null && (
          <h3>{poems.error}</h3>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={poems.totalPages}
        changePage={changePage}
      />
    </div>
  );
}
