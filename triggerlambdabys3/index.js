const Aws = require('aws-sdk');
const S3 = new Aws.S3();
const {v4: uuidv4} = require('uuid');

module.exports.get_s3_upload_url = async (event) => {
  const params = {
    Bucket: 'zorigoobilguunleap3triggers3',
    Key: `${uuidv4()}.png`,
    ContentType: 'image/png',
  };
  const uploadUrl = S3.getSignedUrl('putObject',params);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        event,
        uploadUrl,
      },
    ),
  };
};
module.exports.function_will_be_triggerd_by_s3 = async (event) => {
  const parsedEvent = JSON.parse(event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
      },
    ),
  };
};