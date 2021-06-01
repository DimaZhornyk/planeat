interface Functor<T> {
  map<R>(f: (v: T) => R): Functor<R>;
  //mapAsync<R>(f: (v: T) => Promise<R>): Promise<Functor<R>>;
  inner(): T;
}

interface Monad<T> extends Functor<T> {
  flatMap<R>(f: (v: T) => Monad<R>): Monad<R>;
  flatMapAsync<R>(f: (v: T) => Promise<Monad<R>>): Promise<Monad<R>>;
}
