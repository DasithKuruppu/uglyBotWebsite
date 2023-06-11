import * as aws from '@pulumi/aws';

export const removeClassDataSources = ({
  api,
  environmentName,
  dataSourceLambdaRequestProcessor,
}: any) => {
  const removeClassResolver = new aws.appsync.Resolver(
    `${environmentName}removeClassResolver`,
    {
      apiId: api.id,
      dataSource: dataSourceLambdaRequestProcessor.name,
      type: `Mutation`,
      field: `removeClass`,
      requestTemplate: `{
        "version": "2018-05-29",
        "operation": "Invoke",
        "payload": {
          "field": "removeClass",
          "context": $util.toJson($context),
          "operation" : "Mutation",
          "selectionSetList": $util.toJson($context.info.selectionSetList),
          "selectionSetGraphQL": $util.toJson($context.info.selectionSetGraphQL),
        }
         
      }`,
      responseTemplate: `$util.toJson($ctx.result)`,
    },
  );

  return { removeClassResolver };
};
