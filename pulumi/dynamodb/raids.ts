import * as aws from '@pulumi/aws';

// export const StagingRaids = new aws.dynamodb.Table(
//   `staging_raids`,
//   {
//     attributes: [
//       {
//         name: `raidId`,
//         type: `S`,
//       },
//       {
//         name: `updatedAt`,
//         type: `N`,
//       },
//       {
//         name: `createdAt`,
//         type: `N`,
//       },
//       {
//         name: `serverId`,
//         type: `S`,
//       },
//       {
//         name: `creatorId`,
//         type: `S`,
//       },
//       {
//         name: `eventDiscordDateTime`,
//         type: `S`,
//       },
//     ],
//     billingMode: `PAY_PER_REQUEST`,
//     globalSecondaryIndexes: [
//       {
//         hashKey: `serverId`,
//         name: `serverIdIndex`,
//         nonKeyAttributes: [`createdAt`, `serverId`, `updatedAt`, `raidId`],
//         projectionType: `INCLUDE`,
//         rangeKey: `creatorId`,
//       },
//       {
//         hashKey: `serverId`,
//         name: `eventTimeIndex`,
//         projectionType: `ALL`,
//         rangeKey: `eventDiscordDateTime`,
//       },
//       {
//         hashKey: `creatorId`,
//         name: `creatorIdIndex`,
//         nonKeyAttributes: [`createdAt`, `serverId`, `updatedAt`, `raidId`],
//         projectionType: `INCLUDE`,
//         rangeKey: `serverId`,
//       },
//       {
//         hashKey: `serverId`,
//         name: `updatedLastIndex`,
//         projectionType: `ALL`,
//         rangeKey: `updatedAt`,
//       },
//     ],
//     hashKey: `raidId`,
//     name: `staging_raids-6d9d4fc`,
//     pointInTimeRecovery: {
//       enabled: false,
//     },
//     rangeKey: `createdAt`,
//     streamEnabled: true,
//     streamViewType: `NEW_AND_OLD_IMAGES`,
//     tags: {
//       Environment: `LAMBDA_STAGING`,
//       Name: `staging_raid`,
//     },
//     tagsAll: {
//       Environment: `LAMBDA_STAGING`,
//       Name: `staging_raid`,
//     },
//     ttl: {
//       attributeName: ``,
//     },
//   },
//   {
//     protect: true,
//   },
// );

export const ProdRaids = new aws.dynamodb.Table(
  `prod_raids`,
  {
    attributes: [
      {
        name: `raidId`,
        type: `S`,
      },
      {
        name: `updatedAt`,
        type: `N`,
      },
      {
        name: `createdAt`,
        type: `N`,
      },
      {
        name: `serverId`,
        type: `S`,
      },
      {
        name: `creatorId`,
        type: `S`,
      },
      {
        name: `eventDiscordDateTime`,
        type: `S`,
      },
    ],
    billingMode: `PAY_PER_REQUEST`,
    globalSecondaryIndexes: [
      {
        hashKey: `serverId`,
        name: `serverIdIndex`,
        nonKeyAttributes: [`createdAt`, `serverId`, `updatedAt`, `raidId`],
        projectionType: `INCLUDE`,
        rangeKey: `creatorId`,
      },
      {
        hashKey: `serverId`,
        name: `eventTimeIndex`,
        projectionType: `ALL`,
        rangeKey: `eventDiscordDateTime`,
      },
      {
        hashKey: `creatorId`,
        name: `creatorIdIndex`,
        nonKeyAttributes: [`createdAt`, `serverId`, `updatedAt`, `raidId`],
        projectionType: `INCLUDE`,
        rangeKey: `serverId`,
      },
      {
        hashKey: `serverId`,
        name: `updatedLastIndex`,
        projectionType: `ALL`,
        rangeKey: `updatedAt`,
      },
    ],
    hashKey: `raidId`,
    name: `dev_ugly_raids-5907476`,
    pointInTimeRecovery: {
      enabled: false,
    },
    rangeKey: `createdAt`,
    streamEnabled: true,
    streamViewType: `NEW_AND_OLD_IMAGES`,
    tags: {
      Environment: `LAMBDA_DEVELOP`,
      Name: `dev_ugly_raid`,
    },
    tagsAll: {
      Environment: `LAMBDA_DEVELOP`,
      Name: `dev_ugly_raid`,
    },
    ttl: {
      attributeName: ``,
    },
  },
  {
    protect: true,
  },
);
