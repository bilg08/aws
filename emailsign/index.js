const {DynamoDB} = require('@aws-sdk/client-dynamodb');
const {marshall, unmarshall} = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const smtpTransport = require('nodemailer-smtp-transport');
module.exports.signup = async (event) => {
  async function hashPass(pass) {
    return await bcrypt.hash(pass, 1);
  }
  const response = await db.putItem({
    TableName: 'users',
    Item: marshall({
      userid: '1',
      firstname: 'Bilguun',
      lastname: 'Zorigoo',
      email: 'bizozobi30@gmail.com',
      password: await hashPass('123456'),
    })
  });
  return '1';
};
module.exports.sendemail = async (event) => {
  const email = event?.Records[0]?.dynamodb?.NewImage?.email?.S;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "bizozobi30@gmail.com", // generated ethereal user
      pass: "qhuadcltdaboceoe", // generated ethereal password
    },
  });
  //qhuadcltdaboceoe
  let mailOptions = {
    from: 'bizozobi30@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js[nodemailer]',
    text: 'That was easy!'
  };
  const info = await transporter.sendMail(mailOptions)
  return info.messageId;
};