//updateitem
const {DynamoDB} = require('@aws-sdk/client-dynamodb');
const {marshall, unmarshall} = require('@aws-sdk/util-dynamodb');
const axios = require('axios');
const db = new DynamoDB();
module.exports.handler1 = async (event) => {
  const {name} = JSON.parse(event.body);
  const axiosRes = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${name}`);
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
  const getReqResult = await axios.get('https://umfnpao4h3.execute-api.us-east-1.amazonaws.com/dev/gif');
  return {
  'statusCode': 200,
  'headers': {'Content-Type': 'application/json'},
  'body': JSON.stringify(getReqResult?.data)
}
};
module.exports.handler2 = async (event) => {
  const {Item} = await db.getItem({
    TableName: 'gifs',
    Key: marshall({
      id: '1',
    }),
  });
  return {
  'statusCode': 200,
  'headers': {'Content-Type': 'application/json'},
  'body':  JSON.stringify(unmarshall(Item)),
}
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
