import { environmentTypes } from '../api/initialize/environment';

export const getEnvironmentFromStack = (stackName: string) => {
  return (
    {
      website: environmentTypes.PRODUCTION,
    }[stackName] || `development`
  );
};
