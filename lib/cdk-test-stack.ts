import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket, EventType, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { SqsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class CdkTestStack extends cdk.Stack {
  readonly level1S3Bucket: CfnBucket;
  readonly level2S3Bucket: Bucket;
  readonly queue: Queue;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.level1S3Bucket = this.createLevel1S3Bucket();
    this.level2S3Bucket = this.createLevel2S3Bucket();
    this.queue = this.createQueue();

    this.level2S3Bucket.addEventNotification(
      EventType.OBJECT_CREATED,
      new SqsDestination(this.queue),
    );
  }

  private createLevel1S3Bucket() {
    const level1S3Bucket = new CfnBucket(this, "MyFirstLevel1ConstructBucket", {
      versioningConfiguration: {
        status: "Enabled",
      },
    });

    return level1S3Bucket;
  }

  private createLevel2S3Bucket(): Bucket {
    const bucket = new Bucket(this, "MyLevel2ConstructBucket", {
      bucketName: `myfirstlevel2constructbucket-${this.account}-${this.region}`,
      versioned: true,
    });

    bucket.addCorsRule({
      allowedMethods: [
        HttpMethods.GET,
        HttpMethods.HEAD,
        HttpMethods.POST,
        HttpMethods.PUT,
        HttpMethods.DELETE,
      ],
      allowedOrigins: ["*"],
      allowedHeaders: ["*"],
    });

    return bucket;
  }

  private createQueue(): Queue {
    return new Queue(this, 'MyQueue', {
      queueName: 'MyQueue',
    });
  }
}

