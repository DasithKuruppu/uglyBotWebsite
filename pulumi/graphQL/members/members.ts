import * as aws from '@pulumi/aws';
import { prodMembers } from '../../dynamodb/members';
import { createIamRole } from '../../createIAMRole';
const role = createIamRole(`membersTableIamRole`, prodMembers);
// Link a data source to the Dynamo DB Table
export const createMemberDataSources = ({ api, environmentName }: any) => {
  const membersDataSource = new aws.appsync.DataSource(
    `${environmentName}membersDataSource`,
    {
      name: `${environmentName}membersDataSource`,
      apiId: api.id,
      type: `AMAZON_DYNAMODB`,
      dynamodbConfig: {
        tableName: prodMembers.name,
      },
      serviceRoleArn: role.arn,
    },
  );

  const getMemebersResolver = new aws.appsync.Resolver(
    `${environmentName}membersResolver`,
    {
      apiId: api.id,
      dataSource: membersDataSource.name,
      type: `Query`,
      field: `getMembers`,
      requestTemplate: `{
          "version": "2017-02-28",
          "operation": "Query",
          "query" : {
            "expression": "discordMemberId = :pkey",
            "expressionValues": {
              ":pkey": $util.dynamodb.toDynamoDBJson($ctx.args.id),
            }
          }
  
      }`,
      responseTemplate: `$util.toJson($ctx.result.items)`,
    },
  );
  return { membersDataSource, getMemebersResolver };
};
