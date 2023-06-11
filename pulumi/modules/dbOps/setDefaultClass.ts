import { prodMembers } from '../../dynamodb/members';
import { getAllUsersClass } from './getMemberClasses';
export const setDefaultClassOp = async (
  userId: string,
  className: string,
  { documentClient }: any,
) => {
  // add a default : false to all the classes
  const allClasses = await getAllUsersClass(userId, { documentClient });
  await Promise.all(
    allClasses.map(async (classInfo: any) => {
      return documentClient
        .update({
          TableName: prodMembers.name.get(),
          Key: {
            discordMemberId: userId,
            className: classInfo.className,
          },
          UpdateExpression: `set #default = :default`,
          ExpressionAttributeNames: {
            '#default': `default`,
          },
          ExpressionAttributeValues: {
            ':default': false,
          },
          ReturnValues: `ALL_NEW`,
        })
        .promise();
    }),
  );

  // then add default: true to the class that was passed in as a param
  const dbResult = await documentClient
    .update({
      TableName: prodMembers.name.get(),
      Key: {
        discordMemberId: userId,
        className,
      },
      UpdateExpression: `set #default = :default`,
      ExpressionAttributeNames: {
        '#default': `default`,
      },
      ExpressionAttributeValues: {
        ':default': true,
      },
      ReturnValues: `ALL_NEW`,
    })
    .promise();

  const { Items = [] } = dbResult;
  return Items;
};
