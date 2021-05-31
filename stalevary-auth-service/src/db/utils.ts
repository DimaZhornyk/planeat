import _ from 'underscore';
export function inserts(numOfInserts: number, numOfParams: number): string {
  const arr = Array.from(
    { length: numOfParams * numOfInserts },
    (_, i) => i + 1
  );
  const grouped: string = _.chain(arr)
    .groupBy((el, i) => {
      return Math.floor(i / numOfParams);
    })
    .toArray()
    .value()
    .map((el) => `(${el.map((e) => '$' + e).join(',')})`)
    .join(',');
  return grouped;
}
