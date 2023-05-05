import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { getEnvironmentFromStack } from '../utils/stackEnvMap';
import { graphQLRequestFactory } from '../modules/graphQLRequestProcessor';
const stack = pulumi.getStack();
export const graphQLHandlerFunction = new aws.lambda.CallbackFunction(
  `${stack}_graphQLRequestProcessor`,
  {
    callbackFactory: graphQLRequestFactory,
    runtime: aws.lambda.Runtime.NodeJS16dX,
    timeout: 30,
    environment: {
      variables: {
        environment: getEnvironmentFromStack(stack),
      },
    },
    codePathOptions: {
      extraIncludePaths: [`../.env.development`, `../.env.production`],
    },
    publish: true,
    memorySize: 256,
  },
);
