import axios from 'axios';

const callApi = function callApi(url, options) {
  const accessToken = sessionStorage.getItem(`token`);
  if (!options.mode) {
    options.mode = 'cors';
  }
  // if (options.headers) {
  //   if (!options.headers['Authorization']) {
  //     Object.assign(options.headers, { 'Authorization': `Bearer ${accessToken}` });
  //   }
  //   if (!options.headers['Content-Type']) {
  //     Object.assign(options.headers, { 'Content-Type': 'application/json' });
  //   }
  // } else {
    options.headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  // }
  options.url = url;
  return axios(options)
    .then(
      (response) => { return response; },
      (error) => { return error; },
    );
};

export default callApi;
