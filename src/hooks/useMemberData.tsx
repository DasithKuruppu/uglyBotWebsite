import { request, gql } from 'graphql-request';
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT as string;
const API_KEY = process.env.GRAPHQL_API_KEY as string;
export const getMemberData = async (userId: string) => {
  const memberData: any = await request({
    url: GRAPHQL_ENDPOINT,
    document: gql`
      query getMembersList($id: String!) {
        getMembers(id: $id) {
          discordMemberId
          className
          default
          artifactsList
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

export const removeClass = async (userId: string, className: string) => {
  const classData: any = await request({
    url: GRAPHQL_ENDPOINT,
    document: gql`
      mutation removeClass($id: String!, $className: String!) {
        removeClass(userId: $id, className: $className) {
          discordMemberId
          className
          default
          artifactsList
          mountsList
          optionalClasses
          serverId
          updatedAt
          userStatus
        }
      }
    `,
    variables: { id: userId, className },
    requestHeaders: {
      'x-api-key': API_KEY,
    },
  });
  console.log({ classData });
  return classData?.removeClass;
};

export const setDefaultClass = async (userId: string, className: string) => {
  const classData: any = await request({
    url: GRAPHQL_ENDPOINT,
    document: gql`
      mutation setDefaultClass($id: String!, $className: String!) {
        setDefaultClass(userId: $id, className: $className) {
          discordMemberId
          className
          default
          artifactsList
          mountsList
          optionalClasses
          serverId
          updatedAt
          userStatus
        }
      }
    `,
    variables: { id: userId, className },
    requestHeaders: {
      'x-api-key': API_KEY,
    },
  });
  console.log({ classData });
  return classData?.setDefaultClass;
};
