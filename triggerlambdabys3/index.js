const Aws = require('aws-sdk');
const S3 = new Aws.S3();
const {v4: uuidv4} = require('uuid');

module.exports.get_s3_upload_url = async (event) => {
  const params = {
    Bucket: 'zorigoobilguunleap3triggers3',
    Key: `${uuidv4()}.${'png'}`,
    ContentType: 'image/png',
  };
  const uploadUrl = S3.getSignedUrl('putObject',params);
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      'Access-Control-Allow-Credentials': true,
      "Access-Control-Allow-Methods": "POST,PUT"
    },
    body: JSON.stringify({
      data: uploadUrl
    })
  };
};
module.exports.getPhotos = async (event) => {
  const bucket = `zorigoobilguunleap3triggers3`;
  const objects = await S3.listObjectsV2({
    Bucket: bucket
  }).promise();
  const links = objects.Contents.map(({Key}) => `https://${bucket}.s3.amazonaws.com/${Key}`);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      'Access-Control-Allow-Credentials': true,

    },
    body: JSON.stringify({
      data: links
    })
  };
};