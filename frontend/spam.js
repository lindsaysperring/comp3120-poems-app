const axios = require("axios");
const durations = [];

axios.interceptors.request.use(
  function (config) {
    config.metadata = { startTime: new Date() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    response.config.metadata.endTime = new Date();
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime;
    durations.push(response.duration);
    return response;
  },
  function (error) {
    error.config.metadata.endTime = new Date();
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;
    durations.push(error.duration);
    return Promise.reject(error);
  }
);

for (let i = 0; i < 1000; i++) {
  axios.get("http://localhost:3001/api/poems?page=1&search=bob", {
    headers: { bob: "Bobalooba" },
  }).catch(err => {console.log(err.message)})
}

setTimeout(() => {
  const sum = durations.reduce((a, b) => a + b, 0);
  console.log(durations.length)
  const avg = sum / durations.length || 0;
  console.log(avg, durations.length);
}, 3000);
