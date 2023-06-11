import { getServerRaidsData } from './getServerRaids';
import { getMembersData } from './getMembers';
export const queries = {
  getServerRaids: getServerRaidsData,
  getMembers: getMembersData,
} as any as Record<string, (args: any, options: any) => Promise<any>>;
