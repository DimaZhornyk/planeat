import { readFile } from 'fs';
export async function readFileAsync(name: string): Promise<Buffer> {
  return new Promise((res, rej) => {
    readFile(name, (err, data) => {
      if (!err) {
        res(data);
      } else {
        console.log('err ' + err);
        rej(err);
      }
    });
  });
}
