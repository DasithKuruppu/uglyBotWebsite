import { prodMembers } from '../../dynamodb/members';
export const setCompanionsOp = async (
  userId: string,
  className: string,
  companionsList: string[],
  { documentClient }: any,
) => {
  // add a default : false to all the classes

  // then add default: true to the class that was passed in as a param
  const dbResult = await documentClient
    .update({
      TableName: prodMembers.name.get(),
      Key: {
        discordMemberId: userId,
        className,
      },
      UpdateExpression: `set #companions = :companions`,
      ExpressionAttributeNames: {
        '#companions': `companions`,
      },
      ExpressionAttributeValues: {
        ':companions': companionsList,
      },
      ReturnValues: `ALL_NEW`,
    })
    .promise();

  console.log({ dbResult });
  const { Items = [] } = dbResult;
  return Items;
};
