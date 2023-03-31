const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();

async function setAttendance(userid,description) {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = 8; 
    const mongolia = utc + (3600000 * offset);
    const mongoliaTimeNow = new Date(mongolia);
    await db.putItem({
      TableName: 'attendance',
      Item: marshall({
        userid,
        createdAt: mongoliaTimeNow.toISOString(),
        description,
      }),
    })
}


module.exports.handler = async (event) => {
  const {userid} = JSON.parse(event.body);
 
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = 8; 
    const mongolia = utc + (3600000 * offset);
    const mongoliaTimeNow = new Date(mongolia);
    const mongoliaTimeNowHour = mongoliaTimeNow.getHours();
    const mongoliaTimeNowMinute = mongoliaTimeNow.getMinutes();
    if(mongoliaTimeNowHour <= 9 && mongoliaTimeNowMinute <= 20) {
      await setAttendance(userid, 'hotsorsongui')
    }else{
      await setAttendance(userid, 'hotsorloo')
    }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      data: {success: true}
    })
  };
};
module.exports.getAllAttendances = async(event) => {

  const userid = event.queryStringParameters.id
  const {Items} = await db.query({
    TableName: 'attendance',
    KeyConditionExpression: 'userid = :userId',
    ExpressionAttributeValues: {
      ':userId': {
        S: userid
      }
    }
  });
  const attendances = Items.map((item) => unmarshall(item));
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: JSON.stringify({
      data: attendances
    })
  };
}
