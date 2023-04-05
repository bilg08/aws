const Aws = require('aws-sdk');
const S3 = new Aws.S3();
const {v4: uuidv4} = require('uuid');

module.exports.get_s3_upload_url = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const {ContentType} = parsedBody;
  const ext = ContentType.split('/');
  const params = {
    Bucket: 'zorigoobilguunleap3triggers3',
    Key: `${uuidv4()}.${ext}`,
    ContentType: ContentType,
  };
  const uploadUrl = S3.getSignedUrl('putObject',params);
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
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
    },
    body: JSON.stringify({
      data: links
    })
  };
};