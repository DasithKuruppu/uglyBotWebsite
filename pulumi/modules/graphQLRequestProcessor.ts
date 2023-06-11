import { Context } from '@pulumi/aws/lambda';
import * as aws from '@pulumi/aws';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { environmentsInitialize } from '../api/initialize/environment';
import { queries } from './queries';
import { mutation } from './mutations';
// import { REST } from 'discord.js';
/**
 * A simple function that returns the request.
 *
 * @param {APIGatewayProxyEvent} event - Api Gateway standard event
 * @param {Context} context - Context to the event
 * @returns returns a confirmation to the message to the
 */
export const graphQLHandler = async (
  event: any,
  context: Context,
  factory: {
    rest: any;
    documentClient: DocumentClient;
  },
) => {
  console.log(`event`, event);
  console.log(`context`, context);
  console.log(`factory`, factory);
  const discordTokenBot = process.env.DISCORD_BOT_TOKEN;
  try {
    const fieldName = event?.field as string;
    const operation = event?.context?.info?.parentTypeName;
    console.log({ fieldName, operation });
    const eventArgs = event?.context?.arguments;
    const queryData =
      operation === `Query`
        ? await queries[fieldName](eventArgs, {
            discordTokenBot,
            factory,
          })
        : await mutation[fieldName](eventArgs, { discordTokenBot, factory });
    return queryData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const graphQLRequestFactory = () => {
  // const rest = new REST({ version: `10` }).setToken(discordBotToken);

  return async (event: any, context: any) => {
    const documentClient = new aws.sdk.DynamoDB.DocumentClient();
    environmentsInitialize();
    return graphQLHandler(event, context, {
      rest: {},
      documentClient,
    });
  };
};
