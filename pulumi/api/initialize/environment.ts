import * as dotenv from 'dotenv';
import process from 'process';

export const DEVELOP_ENV_CONFIG_PATH = `/.env.development`;
export const PRODUCTION_ENV_CONFIG_PATH = `/.env.production`;

export enum environmentTypes {
  DEVELOPMENT = `DEVELOPMENT`,
  PRODUCTION = `PRODUCTION`,
}

const environmentsInitialize: () => dotenv.DotenvConfigOutput = () => {
  const currentEnv =
    (process.env.environment as environmentTypes) ||
    environmentTypes.PRODUCTION;
  const lambdaRootPath = process.env.LAMBDA_TASK_ROOT;
  // If its a LambdaEnv make no calls to process.cwd() due to pulumi serialization issues
  const envPaths = {
    [environmentTypes.DEVELOPMENT]: lambdaRootPath + DEVELOP_ENV_CONFIG_PATH,
    [environmentTypes.PRODUCTION]: lambdaRootPath + PRODUCTION_ENV_CONFIG_PATH,
  };
  console.log({ currentEnv });
  const supportedEnvironments: Array<string> = Object.keys(envPaths);
  const isEnvironmentSupported = supportedEnvironments.includes(currentEnv);

  const envConfiginitialization = isEnvironmentSupported
    ? dotenv.config({
        path: envPaths[currentEnv],
        override: false,
      })
    : { error: new Error(`Unsupported environment specified !`) };
  return envConfiginitialization;
};

export { environmentsInitialize };
