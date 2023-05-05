import { request, gql } from 'graphql-request';

export const getRaidData = async (userId: string) => {
  const raidData: any = await request({
    url: `https://cd3mw4xsrzg2veu5a6flni5yzm.appsync-api.us-east-1.amazonaws.com/graphql`,
    document: gql`
      query getRaidsList($id: String!, $userId: String!) {
        getRaids(id: $id, userId: $userId) {
          raidId
          title
        }
      }
    `,
    variables: { id: `WdOFk0ijCb`, userId },
    requestHeaders: {
      'x-api-key': `da2-sqp3uuztjrcurktkujm6fwtmiu`,
    },
  });
  console.log({ raidData });
  return raidData?.getRaids;
};
