const AWS = require('aws-sdk');
const axios = require('axios');
const LAMBDA = new AWS.Lambda();
// const CLOUDWATCH = new AWS.CloudWatchLogs();
module.exports.caller = async (event) => {
  const res = await LAMBDA.invoke({
    FunctionName: 'arn:aws:lambda:us-east-1:826192565530:function:gif-dev-receiver',
    Payload: JSON.stringify({name: "nba",}),
    InvocationType: 'Event',
  }).promise();
  return "hello_caller";
};
module.exports.receiver = async (event) => {
  /*
  An event is a JSON-formatted document that contains data for a Lambda function 
  to process. The Lambda runtime converts the event to an object and passes it to your function code.
  */
  const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=50&offset=0&q=${event.name}`);
  const result = response.data.data.map(item => item.url)
  console.log(result);
  return event;
};