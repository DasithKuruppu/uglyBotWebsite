import { request, gql } from 'graphql-request';
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT as string;
const API_KEY = process.env.GRAPHQL_API_KEY as string;
export const getRaidData = async (userId: string) => {
  const raidData: any = await request({
    url: GRAPHQL_ENDPOINT,
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
      'x-api-key': API_KEY,
    },
  });
  console.log({ raidData });
  return raidData?.getRaids;
};
