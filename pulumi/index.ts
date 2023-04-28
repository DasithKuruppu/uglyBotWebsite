import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as syncedFolder from '@pulumi/synced-folder';
import { StagingRaids } from './dynamodb/raids';
import { GraphQLAPIkey, GraphQLEndpoint } from './graphQL';
// Import the program's configuration settings.
const config = new pulumi.Config();
const path = config.get(`path`) || `../public`;
console.log({ path });
const indexDocument = config.get(`indexDocument`) || `index.html`;
const errorDocument = config.get(`errorDocument`) || `error.html`;

// Create an S3 bucket and configure it as a website.
const bucket = new aws.s3.Bucket(`uglybot.click`, {
  acl: `public-read`,
  website: {
    indexDocument,
    errorDocument,
  },
});

// Use a synced folder to manage the files of the website.
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const bucketFolder = new syncedFolder.S3BucketFolder(`bucket-folder`, {
  path,
  bucketName: bucket.bucket,
  acl: `public-read`,
});

// Create a CloudFront CDN to distribute and cache the website.
const cdn = new aws.cloudfront.Distribution(`cdn`, {
  enabled: true,
  // aliases: [`uglybot.click`],
  origins: [
    {
      originId: bucket.arn,
      domainName: bucket.websiteEndpoint,
      customOriginConfig: {
        originProtocolPolicy: `http-only`,
        httpPort: 80,
        httpsPort: 443,
        originSslProtocols: [`TLSv1.2`],
      },
    },
  ],
  defaultCacheBehavior: {
    targetOriginId: bucket.arn,
    viewerProtocolPolicy: `redirect-to-https`,
    allowedMethods: [`GET`, `HEAD`, `OPTIONS`],
    cachedMethods: [`GET`, `HEAD`, `OPTIONS`],
    defaultTtl: 600,
    maxTtl: 600,
    minTtl: 600,
    forwardedValues: {
      queryString: true,
      cookies: {
        forward: `all`,
      },
    },
  },
  priceClass: `PriceClass_100`,
  customErrorResponses: [
    {
      errorCode: 404,
      responseCode: 404,
      responsePagePath: `/${errorDocument}`,
    },
  ],
  restrictions: {
    geoRestriction: {
      restrictionType: `none`,
    },
  },
  viewerCertificate: {
    cloudfrontDefaultCertificate: true,
  },
});

// Export the URLs and hostnames of the bucket and distribution.
export const originURL = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
export const originHostname = bucket.websiteEndpoint;
export const cdnURL = pulumi.interpolate`https://${cdn.domainName}`;
export const cdnHostname = cdn.domainName;

export const tableStagingRaids = StagingRaids.name;
export { GraphQLEndpoint, GraphQLAPIkey };
