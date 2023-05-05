import { ProdRaids } from './raids';

export const tables: Record<string, Record<string, any>> = {
  staging: {
    raids: ProdRaids,
  },
};
