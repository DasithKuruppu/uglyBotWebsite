import { ProdRaids } from '../../dynamodb/raids';
export const getUpcomingRaids = async (
  { serverId, today = Date.now() }: { serverId: string; today?: number },
  { documentClient }: { documentClient: any },
) => {
  const currentDay = new Date(today);
  const weekAhead = currentDay.setDate(currentDay.getDate() + 60);
  const dbResult = await documentClient
    .query({
      TableName: ProdRaids.name.get(),
      IndexName: `eventTimeIndex`,
      KeyConditionExpression: `#serverId = :pkey AND #eventDiscordDateTime BETWEEN :today AND :weekAhead`,
      ExpressionAttributeValues: {
        ':pkey': serverId,
        ':weekAhead': `<t:${weekAhead}:F>`,
        ':today': `<t:${today}:F>`,
      },
      ExpressionAttributeNames: {
        '#serverId': `serverId`,
        '#eventDiscordDateTime': `eventDiscordDateTime`,
      },
      ScanIndexForward: true,
    })
    .promise();
  const { Items = [] } = dbResult;
  return Items;
};
