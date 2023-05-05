import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { tables } from './dynamodb';
import { createIamRole } from './createIAMRole';
import { graphQLHandlerFunction } from './lambdas/queryHandler';
const stackName = pulumi.getStack();
const stackMap: Record<string, string> = {
  website: `staging`,
  'website-prod': `staging`,
};

const environmentName = stackMap[stackName];
console.log({ environmentName, stackName });
// Create IAM role and policy wiring

const raidsTable = tables[environmentName].raids;
const role = createIamRole(
  `raidsTableIAMRole`,
  raidsTable,
  graphQLHandlerFunction,
);

// GraphQL Schema
const schema = `
    type Query {
        getRaids(id: String!, userId: String!): [Raid]
        getServerRaids(userId: String!): [ServerRaids]
    }

    type ServerRaids {
        id: String
        name: String
        icon: String
        owner: Boolean
        permissions: String
        raids: [Raid]
    }

    type Raid {
        raidId: String!
        title: String
        authorName: String
        description: String
        eventDate: String
        type: String
        updatedAt: String
        messageId: String
        channelId: String
        serverId: String
    }

    schema {
        query: Query
    }`;

// Create API accessible with a key
const api = new aws.appsync.GraphQLApi(`${environmentName}api`, {
  authenticationType: `API_KEY`,
  schema,
});
const apiKey = new aws.appsync.ApiKey(`${environmentName}key`, {
  apiId: api.id,
});

// Link a data source to the Dynamo DB Table
const raidsDataSource = new aws.appsync.DataSource(
  `${environmentName}raidsDataSource`,
  {
    name: `${environmentName}raidsDataSource`,
    apiId: api.id,
    type: `AMAZON_DYNAMODB`,
    dynamodbConfig: {
      tableName: raidsTable.name,
    },
    serviceRoleArn: role.arn,
  },
);

// Link a data source to the lambda fn
const dataSourceLambdaRequestProcessor = new aws.appsync.DataSource(
  `${environmentName}LambdaRequestProcessorSource`,
  {
    name: `${environmentName}LambdaRequestProcessor`,
    apiId: api.id,
    type: `AWS_LAMBDA`,
    lambdaConfig: {
      functionArn: graphQLHandlerFunction.arn,
    },
    serviceRoleArn: role.arn,
  },
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getServerResolver = new aws.appsync.Resolver(
  `${environmentName}serversRaidsResolver`,
  {
    apiId: api.id,
    dataSource: dataSourceLambdaRequestProcessor.name,
    type: `Query`,
    field: `getServerRaids`,
    requestTemplate: `{
      "version": "2018-05-29",
      "operation": "Invoke",
      "payload": {
        "field": "getServerRaids",
        "context": $util.toJson($context),
        "operation" : "Query",
        "selectionSetList": $util.toJson($context.info.selectionSetList),
        "selectionSetGraphQL": $util.toJson($context.info.selectionSetGraphQL),
      }
       
    }`,
    responseTemplate: `$util.toJson($ctx.result)`,
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getRaidsResolver = new aws.appsync.Resolver(
  `${environmentName}raidsResolver`,
  {
    apiId: api.id,
    dataSource: raidsDataSource.name,
    type: `Query`,
    field: `getRaids`,
    requestTemplate: `{
        "version": "2017-02-28",
        "operation": "Query",
        "query" : {
          "expression": "raidId = :pkey",
          "expressionValues": {
            ":pkey": $util.dynamodb.toDynamoDBJson($ctx.args.id),
          }
        }

    }`,
    responseTemplate: `$util.toJson($ctx.result.items)`,
  },
);

// A resolver for the [addTenant] mutation
// const addResolver = new aws.appsync.Resolver(`add-resolver`, {
//   apiId: api.id,
//   dataSource: raidsDataSource.name,
//   type: `Mutation`,
//   field: `addTenant`,
//   requestTemplate: `{
//         "version" : "2017-02-28",
//         "operation" : "PutItem",
//         "key" : {
//             "id" : $util.dynamodb.toDynamoDBJson($ctx.args.id)
//         },
//         "attributeValues" : {
//             "name": $util.dynamodb.toDynamoDBJson($ctx.args.name)
//         }
//     }`,
//   responseTemplate: `$util.toJson($ctx.result)`,
// });

export const GraphQLEndpoint = api.uris.GRAPHQL;
export const GraphQLAPIkey = apiKey.key;

/**
 *
 * An example query:
 *

    query GetTenant {
        getTenantById(id: "123") {
            id
            name
        }
    }

 *
 * An example mutation:
 *

    mutation AddTenant {
        addTenant(id: "123", name: "First Corp") {
            id
            name
        }
    }

 *
 */
