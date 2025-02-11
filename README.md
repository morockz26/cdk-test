# CdkTestStack

This project uses **AWS CDK** (Cloud Development Kit) to define and deploy an infrastructure stack with an S3 bucket, an SQS queue, and event notifications. The stack includes two S3 buckets, one with versioning enabled, and another with specific configurations for cross-origin resource sharing (CORS). It also sets up an SQS queue for event notifications when an object is created in the second S3 bucket.

## Prerequisites

Before you can use this project, you need to have the following:

- **AWS Account**: You should have access to an AWS account and proper permissions to create resources like S3 and SQS.
- **AWS CLI**: Installed and configured to work with your AWS account.
- **Node.js**: Installed on your local machine. AWS CDK requires Node.js to run.
- **AWS CDK**: The AWS CDK tool installed globally on your system.

## Installation

1. **Install Node.js**:  
   You can download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

2. **Install AWS CDK**:  
   Install the AWS CDK globally by running the following command:

   ```bash
   npm install -g aws-cdk
   ```
  
3. **Clone the Repository**

   Clone to your local machine

   ```bash
   git clone <repository-url>
   ```

4. **Install Dependencies**

   Install the necessary Node.js dependencies using npm

   ```bash
   npm install
   ```

## Stack Overview

This project defines a single stack: CdkTestStack.

### Resources Created

#### Level 1 S3 Bucket (MyFirstLevel1ConstructBucket)

- Versioning enabled for object version management.
- This bucket doesn't include any specific CORS or event notification configurations.

#### Level 2 S3 Bucket (MyLevel2ConstructBucket)

- Versioning enabled.
- Configured with CORS rules allowing GET, POST, PUT, DELETE, and HEAD methods from any origin (*).
- Includes an event notification that triggers when an object is created, sending the event to the SQS queue.

#### SQS Queue (MyQueue)

- A queue to receive event notifications from the second S3 bucket when objects are created.

#### Event Notifications

S3 to SQS Notification: The second S3 bucket sends an event to the SQS queue when an object is created in the bucket.

## How to Deploy

### Deploy the Stack

You can deploy the stack to your AWS account by running:

```bash
cdk deploy
```

This will create all the resources defined in the stack (S3 buckets, SQS queue, and the event notification configuration).

### Check the Resources

Once deployed, you can view the resources in the AWS Management Console:

Go to the S3 service to see the created buckets.
Go to the SQS service to view the created queue.

## How to Destroy the Stack

If you want to delete the resources created by this stack, run:

```bash
cdk destroy
```

This will remove all the resources, including the S3 buckets and SQS queue.

## Running Tests

To ensure everything works as expected, the project includes tests using the CDK Assertions module. These tests check if the resources are created with the expected properties.

```bash
npm run test
```
