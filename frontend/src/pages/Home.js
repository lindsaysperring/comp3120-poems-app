import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import Pagination from "../components/Pagination";
import PoemCard from "../components/PoemCard";
import axios from "axios";
import { liveSearch } from "../utils/liveSearch";
import qs from "qs";

export default function Home() {
  // Initial poems state
  const [poems, setPoems] = useState({
    poems: [],
    totalPages: 1,
    status: "idle",
    error: null,
  });

  // Set initial search terms and page number if present in url.
  // Better experience so user can bookmark the page and go back from another page to the same set of poems that they had before
  const location = useLocation();
  const initialSearch =
    qs.parse(location.search, { ignoreQueryPrefix: true }).search || "";
  const initialPage =
    Number(qs.parse(location.search, { ignoreQueryPrefix: true }).page) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const history = useHistory();

  useEffect(() => {
    // Set loading status
    setPoems({ ...poems, status: "loading" });

    // Generate query params depending on if there is a search term or not
    const queryParams =
      searchTerm !== ""
        ? `page=${currentPage}&search=${searchTerm}`
        : `page=${currentPage}`;

    // Get initial poems
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
          return setPoems({
            ...poems,
            status: "error",
            error: error.response.data.error
              ? error.response.data.error
              : error.response.data,
          });
        } else if (error.request) {
          console.log("test2");
          return setPoems({
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (pageNumber) => {
    // If page number out of range or same as current page number do nothing
    if (pageNumber < 1 || pageNumber > poems.totalPages) return;
    if (pageNumber === currentPage) return;

    // Generate query params depending on if there is a search term or not
    const queryParams =
      searchTerm !== ""
        ? `page=${pageNumber}&search=${searchTerm}`
        : `page=${pageNumber}`;

    // Set loading state and change page number
    setPoems({ ...poems, error: null, status: "loading" });
    setCurrentPage(pageNumber);

    // Update query params
    history.replace({
      pathname: "/",
      search:
        searchTerm !== ""
          ? `?page=${pageNumber}&search=${searchTerm}`
          : `?page=${pageNumber}`,
    });

    // Get poems on selected page
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
          setPoems({
            ...poems,
            status: "error",
            error: error.response.data.error,
          });
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
    // set loading state
    setPoems({ ...poems, status: "loading" });

    // search using search term
    const res = await liveSearch(`/api/poems?page=1&search=${searchVal}`);

    // If search req gets cancelled do nothing
    if (res == null) return;
    if (res != null && res.error === null && res.cancelled) return;

    // resets current page to 1 on new search
    setCurrentPage(1);

    // api request error handling
    if (res.error)
      return setPoems({
        ...poems,
        status: "error",
        error: res.error,
      });

    // Change query params to new search term
    history.replace({
      pathname: "/",
      search: `?page=${currentPage}&search=${searchVal}`,
    });

    // Update new poems
    setPoems({
      ...poems,
      poems: res.data,
      status: "success",
      totalPages: res.totalPages,
    });
  };

  // Handle search change
  const searchHandler = (e) => {
    search(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Awesome Poems</h1>

      {/* Search Bar */}
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search"
          onChange={searchHandler}
          value={searchTerm}
        />
      </div>

      {/* Display Poems */}
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

        {/* Loading and error messages */}
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
