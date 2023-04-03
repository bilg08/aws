const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const uuid = require('uuid');
module.exports.handler = async (event) => {
  const Key = `asd.png`
  const s3Params = {
    Bucket: `leap3devbilguunzs3`,
    Key: Key,
    ContentType: 'image/png'
  }
  const uploadURL = s3.getSignedUrl('putObject', s3Params)
  return JSON.stringify({
    uploadURL: uploadURL,
    Key
  })
};
