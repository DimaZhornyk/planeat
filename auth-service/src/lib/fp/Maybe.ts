export abstract class Maybe<T> implements Monad<T> {
  abstract flatMap<R>(f: (v: T) => Maybe<R>): Maybe<R>;
  abstract flatMapAsync<R>(f: (v: T) => Promise<Maybe<R>>): Promise<Maybe<R>>;
  abstract map<R>(f: (v: T) => R): Maybe<R>;
  abstract mapAsync<R>(f: (v: T) => Promise<R>): Maybe<Promise<R>>;
  abstract mapPromise<R>(f: (v: T) => Promise<R>): Promise<Maybe<R>>;
  abstract inner(): T;
  abstract getOrElse(f: () => T): T;
  abstract getOrElseAsync(f: () => Promise<T>): Promise<T>;
}

export function maybeof<T>(v: T): Maybe<T> {
  return v != null ? Just.of(v) : None.of(v);
}

export function maybetry<T>(f: () => T): Maybe<T> {
  try {
    return maybeof(f());
  } catch (e) {
    return maybeof(e);
  }
}

export class Just<T> extends Maybe<T> {
  constructor(private readonly value: T | null) {
    super();
    if (value == null) {
      throw new Error(`Passed invalid value: ${value}`);
    }
  }
  static of<T>(v: T): Just<T> {
    return new Just(v);
  }
  flatMap<R>(f: (v: T) => Maybe<R>): Maybe<R> {
    return maybeof(f(this.value).inner());
  }
  async flatMapAsync<R>(f: (v: T) => Promise<Maybe<R>>): Promise<Maybe<R>> {
    return maybeof((await f(this.value)).inner());
  }
  map<R>(f: (v: T) => R): Maybe<R> {
    return maybeof(f(this.value));
  }
  mapAsync<R>(f: (v: T) => Promise<R>): Maybe<Promise<R>> {
    const res = Promise.resolve(this.value).then((r) => f(r));
    return maybeof(res);
  }
  async mapPromise<R>(f: (v: T) => Promise<R>): Promise<Maybe<R>> {
    return maybeof(await f(this.value));
  }
  inner(): T {
    return this.value;
  }
  getOrElse(f: () => T): T {
    return this.value;
  }
  async getOrElseAsync(f: () => Promise<T>): Promise<T> {
    return this.value;
  }
}

export class None<T> extends Maybe<T> {
  constructor() {
    super();
  }
  static of<T>(v: T): None<T> {
    return new None();
  }
  flatMap<R>(f: (v: T) => Maybe<R>): Maybe<R> {
    return None.of(null);
  }
  async flatMapAsync<R>(f: (v: T) => Promise<Maybe<R>>): Promise<Maybe<R>> {
    return None.of(null);
  }
  map<R>(f: (v: T) => R): Maybe<R> {
    return None.of(null);
  }
  mapAsync<R>(f: (v: T) => Promise<R>): Maybe<Promise<R>> {
    return None.of(Promise.resolve(null));
  }
  async mapPromise<R>(f: (v: T) => Promise<R>): Promise<Maybe<R>> {
    return None.of(null);
  }
  inner(): T {
    return null;
  }
  getOrElse(f: () => T): T {
    return f();
  }
  async getOrElseAsync(f: () => Promise<T>): Promise<T> {
    return f();
  }
}
