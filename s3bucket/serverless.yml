service: s3bucket
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs16.x

resources: 
  Resources:
    BilguunBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: zorigoobilguunleap3
    BucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
        Bucket: !Ref BilguunBucket
        PolicyDocument:
          Statement:
            - Action:
                - s3:PutObject
                - s3:GetObject
              Resource:
                - arn:aws:s3:::zorigoobilguunleap3/*
              Effect: Allow
              Principal: "*"

functions:
  function1:
    handler: index.handler  
    events:
      - http:
          path: /
          method: GET
          cors:
            origin: "*"
            headers:
              - "*"
            allowCredentials: true
  
