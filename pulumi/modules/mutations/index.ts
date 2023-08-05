import { removeClassName } from './removeClass';
import { setDefaultClass } from './setDefaultClass';
import { setCompanions } from './setCompanions';
export const mutation = {
  removeClass: removeClassName,
  setDefaultClass,
  setCompanions,
} as any as Record<string, (args: any, options: any) => Promise<any>>;
