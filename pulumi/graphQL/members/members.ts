import * as aws from '@pulumi/aws';
// Link a data source to the Dynamo DB Table
export const createMemberDataSources = ({
  api,
  environmentName,
  dataSourceLambdaRequestProcessor,
}: any) => {
  const getMembersResolver = new aws.appsync.Resolver(
    `${environmentName}membersResolver`,
    {
      apiId: api.id,
      dataSource: dataSourceLambdaRequestProcessor.name,
      type: `Query`,
      field: `getMembers`,
      requestTemplate: `{
        "version": "2018-05-29",
        "operation": "Invoke",
        "payload": {
          "field": "getMembers",
          "context": $util.toJson($context),
          "operation" : "Query",
          "selectionSetList": $util.toJson($context.info.selectionSetList),
          "selectionSetGraphQL": $util.toJson($context.info.selectionSetGraphQL),
        }
         
      }`,
      responseTemplate: `$util.toJson($ctx.result)`,
    },
  );

  return { getMembersResolver };
};
