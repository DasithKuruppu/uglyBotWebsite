import { prodMembers } from '../../dynamodb/members';
export const getAllUsersClass = async (
  userId: string,
  { documentClient }: any,
) => {
  const dbResult = await documentClient
    .query({
      TableName: prodMembers.name.get(),
      KeyConditionExpression: `#DYNOBASE_discordMemberId = :pkey`,
      ExpressionAttributeValues: {
        ':pkey': userId,
      },
      ExpressionAttributeNames: {
        '#DYNOBASE_discordMemberId': `discordMemberId`,
      },
      ScanIndexForward: true,
    })
    .promise();
  const { Items = [] } = dbResult;
  return Items;
};
