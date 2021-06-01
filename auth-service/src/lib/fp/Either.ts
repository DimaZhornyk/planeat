export async function tryCatchAsync<E, T>(
  f: () => Promise<T>
): Promise<[E, T]> {
  try {
    return [null, await f()];
  } catch (e) {
    return [e as E, null];
  }
}
