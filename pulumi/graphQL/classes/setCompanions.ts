import * as aws from '@pulumi/aws';

export const setCompanionDataSource = ({
  api,
  environmentName,
  dataSourceLambdaRequestProcessor,
}: any) => {
  const setCompanionResolver = new aws.appsync.Resolver(
    `${environmentName}setCompanionResolver`,
    {
      apiId: api.id,
      dataSource: dataSourceLambdaRequestProcessor.name,
      type: `Mutation`,
      field: `setCompanions`,
      requestTemplate: `{
        "version": "2018-05-29",
        "operation": "Invoke",
        "payload": {
          "field": "setCompanions",
          "context": $util.toJson($context),
          "operation" : "Mutation",
          "selectionSetList": $util.toJson($context.info.selectionSetList),
          "selectionSetGraphQL": $util.toJson($context.info.selectionSetGraphQL),
        }
         
      }`,
      responseTemplate: `$util.toJson($ctx.result)`,
    },
  );

  return { setCompanionResolver };
};
