const Aws = require('aws-sdk');
const S3 = new Aws.S3();
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken')
module.exports.get_s3_upload_url = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const {ContentType} = parsedBody;
  const ext = ContentType.split('/')[1];
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
  const {token} = event.queryStringParameters;
  try {
    jwt.verify(token, 'hash');
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
  } catch (error) {
    return {
      statusCode: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
    
  // } catch (error) {
  //   return {
  //     statusCode: 400,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "*",
  //     },
  //     body: JSON.stringify({
  //       success: false,
  //       error: error.message
  //     })
  //   };
  // }
  
};