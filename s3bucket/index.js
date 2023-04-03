const Aws = require('aws-sdk');
const S3 = new Aws.S3();
const {v4: uuidv4} = require('uuid');
module.exports.handler = async (event) => {
  const params = {
    Bucket: 'zorigoobilguunleap3',
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
