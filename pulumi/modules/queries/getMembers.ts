import { HTTPRequest } from '../../api/utils/request';
import { getAllUsersClass } from '../dbOps/getMemberClasses';
export const getMembersData = async (
  { id: userId }: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { discordTokenBot, factory }: any,
) => {
  const providerName = `oauth_discord`;
  const response: any = await HTTPRequest({
    path: `/v1/users/${userId}/oauth_access_tokens/${providerName}`,
  });
  console.log({ response: JSON.stringify(response) });
  const [responseBody] = response;
  const discordUserResponse = await HTTPRequest({
    path: `/api/v9/users/@me`,
    hostname: `discord.com`,
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${responseBody?.token}`,
    },
  });
  const { id: discordUserId } = discordUserResponse as any;
  const result = await getAllUsersClass(discordUserId, {
    documentClient: factory.documentClient,
  });

  return discordUserId ? result : [];
};
