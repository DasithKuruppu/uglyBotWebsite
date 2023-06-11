import * as aws from '@pulumi/aws';

export const setDefaultClassDataSources = ({
  api,
  environmentName,
  dataSourceLambdaRequestProcessor,
}: any) => {
  const setDefaultClassResolver = new aws.appsync.Resolver(
    `${environmentName}setDefaultClassResolver`,
    {
      apiId: api.id,
      dataSource: dataSourceLambdaRequestProcessor.name,
      type: `Mutation`,
      field: `setDefaultClass`,
      requestTemplate: `{
        "version": "2018-05-29",
        "operation": "Invoke",
        "payload": {
          "field": "setDefaultClass",
          "context": $util.toJson($context),
          "operation" : "Mutation",
          "selectionSetList": $util.toJson($context.info.selectionSetList),
          "selectionSetGraphQL": $util.toJson($context.info.selectionSetGraphQL),
        }
         
      }`,
      responseTemplate: `$util.toJson($ctx.result)`,
    },
  );

  return { setDefaultClassResolver };
};
