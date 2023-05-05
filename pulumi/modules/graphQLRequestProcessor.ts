import { Context } from '@pulumi/aws/lambda';
import { HTTPRequest } from '../api/utils/request';
import * as aws from '@pulumi/aws';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { getUpcomingRaids } from './dbOps/raidsUpcoming';
import { environmentsInitialize } from '../api/initialize/environment';
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
  try {
    const discordTokenBot = process.env.DISCORD_BOT_TOKEN;
    const userId = event.context?.arguments?.userId;
    const providerName = `oauth_discord`;
    const response: any = await HTTPRequest({
      path: `/v1/users/${userId}/oauth_access_tokens/${providerName}`,
    });
    console.log({ response: JSON.stringify(response) });
    const [responseBody] = response;
    //
    const discordGetChannelMessage = ({ channelId, messageId }: any) =>
      HTTPRequest({
        path: `/api/v9/channels/${channelId}/messages/${messageId}`,
        hostname: `discord.com`,
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bot ${discordTokenBot}`,
        },
      });
    // const discordUserResponse = await HTTPRequest({
    //   path: `/api/v9/users/@me`,
    //   hostname: `discord.com`,
    //   headers: {
    //     'Content-Type': `application/json`,
    //     Authorization: `Bearer ${responseBody?.token}`,
    //   },
    // });

    const discordUserGuildsResponse = (await HTTPRequest({
      path: `/api/v9/users/@me/guilds`,
      hostname: `discord.com`,
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${responseBody?.token}`,
      },
    })) as any[];
    console.log({ discordUserGuildsResponse });
    const discordBotGuildsResponse = (await HTTPRequest({
      path: `/api/v9/users/@me/guilds`,
      hostname: `discord.com`,
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bot ${discordTokenBot}`,
      },
    })) as any[];

    console.log({ discordBotGuildsResponse });
    const discordBotGuildIds = discordBotGuildsResponse?.map(
      ({ id }: any) => id,
    ) as string[];
    const filteredServers = discordUserGuildsResponse.filter(({ id }: any) =>
      discordBotGuildIds.includes(id),
    );
    const raidsList = await Promise.all(
      filteredServers.map(async ({ id, ...otherRaidData }: any) => {
        const raids = await getUpcomingRaids(
          { serverId: id },
          { documentClient: factory.documentClient },
        );

        const filteredRaids = await Promise.all(
          raids.map(
            async ({
              channelId,
              messageId,
              eventDiscordDateTime,
              ...otherRaidData
            }: any) => {
              try {
                const { id: msgResponseId }: any =
                  await discordGetChannelMessage({
                    channelId,
                    messageId,
                  });
                return {
                  messageId,
                  channelId,
                  eventDate: eventDiscordDateTime.split(`:`)[1],
                  ...otherRaidData,
                  available: !!msgResponseId,
                };
              } catch (error) {
                console.log(error);
                return {
                  channelId,
                  messageId,
                  eventDate: eventDiscordDateTime.split(`:`)[1],
                  ...otherRaidData,
                  available: false,
                };
              }
            },
          ),
        );
        console.log(`filteredraids`, filteredRaids);
        const remappedRaids = filteredRaids
          .filter(
            ({ available, eventDate }) =>
              available && Number(eventDate) > Math.floor(Date.now() / 1000),
          )
          .map(
            ({
              raidId,
              autorName: authorName,
              title,
              description,
              eventDate,
              type,
              updatedAt,
              messageId,
              channelId,
              serverId,
            }: any) => ({
              raidId,
              authorName,
              eventDate,
              title,
              description,
              type,
              updatedAt,
              messageId,
              channelId,
              serverId,
            }),
          );
        return { id, ...otherRaidData, raids: remappedRaids };
      }),
    );
    const serversWithRaids = raidsList.filter(({ raids }) => raids.length);
    return serversWithRaids;
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
