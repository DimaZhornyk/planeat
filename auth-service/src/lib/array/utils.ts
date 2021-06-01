import { Maybe } from '../fp/Maybe';

type P = { slice };
export function split<T extends P>(arr: T, pos: number): [T, T] {
  const first = arr.slice(0, pos);
  const second = arr.slice(pos);
  return [first, second];
}
//prettier-ignore
export class Skip {_}
export const skip = (): Skip => new Skip();
export function filterSkip<T>(arr: (T | Skip)[]): T[] {
  return arr
    .filter((el) => {
      return el == null || el.constructor !== Skip;
    })
    .map((el) => el as T);
}
