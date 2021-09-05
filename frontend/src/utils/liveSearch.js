// From https://www.digitalocean.com/community/tutorials/react-live-search-with-axios

import axios from "axios";

const resources = {};

const makeRequestCreator = () => {
  let cancel;

  return async (query) => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    try {
      if (resources[query]) {
        // Return result if it exists
        return resources[query];
      }
      const res = await axios(query, { cancelToken: cancel.token });

      const result = res.data;
      // Store response
      resources[query] = result;

      return {...result, error: null};
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
        return { error: null, cancelled: true };
      } else {
        console.log("Something went wrong: ", error.message);
        return { error: error.message, cancelled: false };
      }
    }
  };
};

export const liveSearch = makeRequestCreator();
