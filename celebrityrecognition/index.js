const Aws = require('aws-sdk');
const S3 = new Aws.S3();
const Rekognition = new Aws.Rekognition();
const {v4: uuidv4} = require('uuid');
const bucketName = 'zorigoobilguunleap3celebritydetection'
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
module.exports.detectCelebrity = async (event) => {
  const imageName = event.Records[0].s3.object.key;
  const rec = await Rekognition.recognizeCelebrities({
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: imageName,
      }
    }
  }).promise();
  const { Id: celebId } = rec.CelebrityFaces[0];
  const celebInfo = await Rekognition.getCelebrityInfo({
    Id: celebId
  }).promise();
  console.log(celebInfo.Name)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
      },
    ),
  };
};
