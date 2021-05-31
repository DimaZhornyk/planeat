import _ from 'underscore';

export const set = (obj: { [key: string]: any }, key: any, value: any) => {
  obj[key] = value;
};
export const sameKeys = (o1: any, o2: any) => {
  const k1: string[] = Object.keys(o1);
  const k2: string[] = Object.keys(o2);
  return _.difference(k1, k2).length === 0 && k1.length - k2.length === 0;
};
