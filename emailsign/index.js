const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
module.exports.signup = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const userid = uuid.v4();
  async function hashPass(pass) {
    return await bcrypt.hash(pass, 1);
  }
  const response = await db.putItem({
    TableName: 'user',
    Item: marshall({
      userid,
      email,
      password: await hashPass(password),
    })
  });
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

module.exports.signin = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const { Item } = await db.getItem({
    TableName: 'user',
    Key: marshall({email})
  });
  const user = unmarshall(Item);
  const isPasswordRight = await bcrypt.compare(password, user.password);
  if (isPasswordRight) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        data: user
      })
    };
  } else {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        error: `Invalid email or password `
      })
    };
  }

};