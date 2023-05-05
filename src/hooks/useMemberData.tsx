import { request, gql } from 'graphql-request';
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT as string;
const API_KEY = process.env.GRAPHQL_API_KEY as string;
export const getMemberData = async (userId: string) => {
  const memberData: any = await request({
    url: GRAPHQL_ENDPOINT,
    document: gql`
      query getMembersList($userId: String) {
        getMembers(id: $userId) {
          discordMemberId
          className
          artifactList
          mountsList
          optionalClasses
          serverId
          updatedAt
          userStatus
        }
      }
    `,
    variables: { id: userId },
    requestHeaders: {
      'x-api-key': API_KEY,
    },
  });
  console.log({ memberData });
  return memberData?.getMembers;
};
