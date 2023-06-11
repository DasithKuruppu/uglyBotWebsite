import { removeClassName } from './removeClass';
import { setDefaultClass } from './setDefaultClass';
export const mutation = {
  removeClass: removeClassName,
  setDefaultClass,
} as any as Record<string, (args: any, options: any) => Promise<any>>;
