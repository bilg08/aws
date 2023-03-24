const AWS = require('aws-sdk');
const CLOUDWATCH = new AWS.CloudWatchLogs();
const LAMBDA = new AWS.Lambda();

module.exports.firstFunction = async (event) => {
  const params = {
    FunctionName: 'arn:aws:lambda:us-east-1:826192565530:function:threelambdafunction-dev-secondFunction',
    InvocationType: 'Event',
    Payload: JSON.stringify({name: 'Bilguun'}),
  }
  const res = await LAMBDA.invoke(params).promise();
  return 'firstFunction';
};
module.exports.secondFunction = async (event) => {
  const {name} = event;
  const params = {
    FunctionName: 'arn:aws:lambda:us-east-1:826192565530:function:threelambdafunction-dev-thirdFunction',
    InvocationType: 'Event',
    Payload: JSON.stringify({name: 'Zorigoo'}),
  }
  const res = await LAMBDA.invoke(params).promise();
  console.log(name + '2');
  //arn:aws:lambda:us-east-1:826192565530:function:threelambdafunction-dev-thirdFunction
  return 'secondFunction';
};
module.exports.thirdFunction = async (event) => {
  const {name} = event;
  console.log(name + '3');
 
  const params = {
    logGroupName: '/aws/lambda/threelambdafunction-dev-secondFunction',
    orderBy: 'LastEventTime',
    descending: true,
  };
  const logs = await CLOUDWATCH.describeLogStreams(params).promise();
  console.log('third function has been called');
  // const param = {

  // };
  const log = await CLOUDWATCH.filterLogEvents({
    logGroupName: '/aws/lambda/threelambdafunction-dev-secondFunction',
  }).promise();
  console.log(log)
  return 'thirdFunction';
};
