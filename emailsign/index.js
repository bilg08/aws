// const {DynamoDB} = require('@aws-sdk/client-dynamodb');
// const {marshall, unmarshall} = require('@aws-sdk/util-dynamodb');
// const db = new DynamoDB();
// const bcrypt = require('bcryptjs');
const axios = require('axios')
// module.exports.signup = async (event) => {
//   const {username, email, password} = JSON.parse(event.body);
//   const userid = '1';
//   async function hashPass(pass) {
//     return await bcrypt.hash(pass, 1);
//   }
//   const response = await db.putItem({
//     TableName: 'users',
//     Item: marshall({
//       userid,
//       username,
//       email,
//       password: await hashPass(password),
//     })
//   });
//   return {
//     'body': 'amjilttai nemlee'
//   };
// };
// module.exports.signin = async (event) => {
//   const {email, password} = JSON.parse(event.body);
//   const {Items} = await db.query({
//     TableName: 'users',
//     KeyConditionExpression: "email = :email",
//     IndexName: "email-index",
//     ExpressionAttributeValues: {
//       ":email": {S: email},
//     }
//   });
//   const user = unmarshall(Items[0]);
//   const isPasswordRight = await bcrypt.compare(password, user.password);
//   if(isPasswordRight) {
//     return {
//       'body': 'true',
//     };
//   }else{
//     return {
//       'body': 'false',
//     };
//   }
  
// };

async function a() {
try {
 const res = await axios.post('https://c1c31nztud.execute-api.us-east-1.amazonaws.com/dev/signin', {
  email: '1@yahoo.com',
  password: '123456',
},{
  headers: {
    'Content-Type': 'application/json',
  }
});
console.log(res)
} catch (error) {
  console.log(error.message)
}
}
a()