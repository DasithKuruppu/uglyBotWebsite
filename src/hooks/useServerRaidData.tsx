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
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT as string;
  const API_KEY = process.env.GRAPHQL_API_KEY as string;
  const serverData: { getServerRaids: IServerRaidData[] } = await request({
    url: GRAPHQL_ENDPOINT,
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
      'x-api-key': API_KEY,
    },
  });
  console.log({ serverData });
  return serverData?.getServerRaids;
};
