import { HTTPRequest } from '../../api/utils/request';
import { getUpcomingRaids } from '../dbOps/raidsUpcoming';
export const getServerRaidsData = async (
  { userId }: any,
  { discordTokenBot, factory }: any,
) => {
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
              const { id: msgResponseId }: any = await discordGetChannelMessage(
                {
                  channelId,
                  messageId,
                },
              );
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
};
