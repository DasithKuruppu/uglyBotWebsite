import { getStack } from '@pulumi/pulumi';
import { environmentTypes } from '../api/initialize/environment';
const stack = getStack();
export const getEnvironmentFromStack = (stackName: string = stack) => {
  return (
    {
      website: environmentTypes.PRODUCTION,
      developWebsite: environmentTypes.DEVELOPMENT,
    }[stackName] || environmentTypes.DEVELOPMENT
  );
};
