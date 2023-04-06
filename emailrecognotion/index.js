const Aws = require('aws-sdk');
const Rekognition = new Aws.Rekognition();
const S3 = new Aws.S3();
const {v4: uuidv4} = require('uuid');
const bucketName = `zorigoobilguunleap3emaildetection`;
module.exports.uploadImage = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const {ContentType} = parsedBody;
  const ext = ContentType.split('/')[1];
  const params = {
    Bucket: bucketName,
    Key: `${uuidv4()}.${ext}`,
    ContentType: ContentType,
  };
  const pre_signed_url = S3.getSignedUrl('putObject', params); 
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        url: pre_signed_url,
      },
    ),
  };
};

module.exports.detectEmail = async(event) => {
  const image = event.Records[0].s3.object.key;
  const params = {
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: image,
      }
    }
  }
  const rec = await Rekognition.detectText(params).promise();
  const results = rec.TextDetections.filter(({DetectedText}) => DetectedText.includes('@yahoo.com') || DetectedText.includes('@gmail.com'));
  const emails = results.map((result) => result.DetectedText);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: emails,
      },
    ),
  };
}
