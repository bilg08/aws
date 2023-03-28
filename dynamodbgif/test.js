const axios = require('axios');

async function g() {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${'nba'}`);
  const urls = response.data.data.map(item => item.url);
  const urlsWithS = urls.map(url => ({
    'S': url
  }));
  console.log(urlsWithS);
};
g();