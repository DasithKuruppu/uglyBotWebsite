import { request, gql } from 'graphql-request';

interface IServerRaidData {
  id: string;
  name: string;
  owner: boolean;
  icon: string;
  permissions: string;
  raids: any[];
}
export const getServerRaidData = async (userId: string) => {
  const serverData: { getServerRaids: IServerRaidData[] } = await request({
    url: `https://cd3mw4xsrzg2veu5a6flni5yzm.appsync-api.us-east-1.amazonaws.com/graphql`,
    document: gql`
      query getServerRaidsData($userId: String!) {
        getServerRaids(userId: $userId) {
          id
          name
          owner
          icon
          permissions
          raids {
            title
            authorName
            description
            type
            eventDate
            updatedAt
            messageId
            channelId
            serverId
          }
        }
      }
    `,
    variables: { userId },
    requestHeaders: {
      'x-api-key': `da2-sqp3uuztjrcurktkujm6fwtmiu`,
    },
  });
  console.log({ serverData });
  return serverData?.getServerRaids;
};
