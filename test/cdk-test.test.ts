import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkTest from '../lib/cdk-test-stack';

describe('CdkTestStack', () => {
  it('Level 1 Bucket Created with Versioning Enabled', () => {
    const app = new cdk.App();
    const stack = new CdkTest.CdkTestStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      VersioningConfiguration: {
        Status: "Enabled"
      }
    });
  });

  it('Level 2 Bucket Created with Proper Properties', () => {
    const app = new cdk.App();
    const stack = new CdkTest.CdkTestStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);
  
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: {
        "Fn::Join": [
          "", [
            "myfirstlevel2constructbucket-",
            { "Ref": "AWS::AccountId" },
            "-",
            { "Ref": "AWS::Region" }
          ]
        ]
      },
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedMethods: [
              "GET", "HEAD", "POST", "PUT", "DELETE"
            ],
            AllowedOrigins: ["*"],
            AllowedHeaders: ["*"]
          }
        ]
      }
    });
  });

  it('SQS Queue Created with Correct Name', () => {
    const app = new cdk.App();
    const stack = new CdkTest.CdkTestStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SQS::Queue', {
      QueueName: "MyQueue"
    });
  });

  it('S3 Bucket is Configured with Notification to SQS Queue', () => {
    const app = new cdk.App();
    const stack = new CdkTest.CdkTestStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);
  
    template.hasResourceProperties('Custom::S3BucketNotifications', {
      NotificationConfiguration: {
        QueueConfigurations: [
          {
            Events: ["s3:ObjectCreated:*"],
          },
        ]
      }
    });
  });  
});
