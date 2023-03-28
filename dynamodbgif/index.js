//updateitem
const {DynamoDB} = require('@aws-sdk/client-dynamodb');
const {marshall} = require('@aws-sdk/util-dynamodb');
const axios = require('axios');
const db = new DynamoDB();
module.exports.handler = async (event) => {
  const axiosRes = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${'nba'}`);
  const urls = axiosRes.data.data.map(item => item.url);
 
  const urlForDynamodb = urls.map(url => ({
    'S': url
  }));
  const res = await db.updateItem({
    TableName: 'gifs',
    Key: marshall({
      id: '1',
    }),
    UpdateExpression: 'SET urls = :changedUrls',
    ExpressionAttributeValues: {
    ":changedUrls": { L: urlForDynamodb },
    },
  });
  return 'changed';
};
//add item 
// const {DynamoDB} = require('@aws-sdk/client-dynamodb');
// const {marshall} = require('@aws-sdk/util-dynamodb');
// const axios = require('axios');
// const db = new DynamoDB();
// module.exports.handler = async (event) => {
//   const axiosRes = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${'antman'}`);
//   const urls = axiosRes.data.data.map(item => item.url);
 
//   const urlForDynamodb = urls.map(url => ({
//     'S': url
//   }));
//   const res = await db.putItem({
//     TableName: 'gifs',
//     Item: marshall({
//       id: '2',
//       urls: urlForDynamodb,
//       heroname: 'antman'
//     }),
//   });
//   return 'changed';
// };
