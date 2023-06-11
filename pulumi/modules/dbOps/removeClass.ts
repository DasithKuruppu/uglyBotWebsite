import { prodMembers } from '../../dynamodb/members';
export const removeClass = async (
  userId: string,
  className: string,
  { documentClient }: any,
) => {
  const dbResult = await documentClient
    .delete({
      TableName: prodMembers.name.get(),
      Key: {
        discordMemberId: userId,
        className,
      },
    })
    .promise();

  const { Items = [] } = dbResult;
  return Items;
};
