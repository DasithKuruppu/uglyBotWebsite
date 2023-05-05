import * as aws from '@pulumi/aws';

export const prodMembers = new aws.dynamodb.Table(
  `prodMembers`,
  {
    attributes: [
      {
        name: `className`,
        type: `S`,
      },
      {
        name: `discordMemberId`,
        type: `S`,
      },
      {
        name: `createdAt`,
        type: `N`,
      },
      {
        name: `characterName`,
        type: `S`,
      },
    ],
    billingMode: `PAY_PER_REQUEST`,
    globalSecondaryIndexes: [
      {
        hashKey: `characterName`,
        name: `characterNameIndex`,
        nonKeyAttributes: [
          `artifactsList`,
          `serverId`,
          `inGameHandle`,
          `className`,
        ],
        projectionType: `INCLUDE`,
        rangeKey: `createdAt`,
      },
      {
        hashKey: `className`,
        name: `classNameIndex`,
        nonKeyAttributes: [
          `artifactsList`,
          `serverId`,
          `characterName`,
          `inGameHandle`,
        ],
        projectionType: `INCLUDE`,
        rangeKey: `createdAt`,
      },
    ],
    hashKey: `discordMemberId`,
    name: `dev_ugly_members-6c41f13`,
    pointInTimeRecovery: {
      enabled: false,
    },
    rangeKey: `className`,
    tags: {
      Environment: `LAMBDA_DEVELOP`,
      Name: `dev_ugly_members`,
    },
    tagsAll: {
      Environment: `LAMBDA_DEVELOP`,
      Name: `dev_ugly_members`,
    },
    ttl: {
      attributeName: ``,
    },
  },
  {
    protect: true,
  },
);
