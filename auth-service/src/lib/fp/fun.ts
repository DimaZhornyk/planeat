import { Logger } from '@nestjs/common';

class Fun<X, Y> {
  constructor(private readonly f: (x: X) => Y) {}
  public apply(x: X): Y {
    return this.f(x);
  }

  /**
   * equivalent to
   * @example
   * f.apply(null)
   */
  public call(): Y {
    return (this.f as () => Y)();
  }

  /**
   * Composition method
   * @example
   * const a = (s:string) => s.toUpperCase()
   * const b = (s:string) => `a_${s}_a`
   * const c = (s:string) => s.repeat(3)
   * fun(console.log)
   *  .c(b)
   *  .c(a)
   *  .apply('hello world')
   * "a_HELLO WORLD_a"
   */
  public c<Z>(h: (x: Z) => X): Fun<Z, Y> {
    return fun((x: Z) => this.apply(h(x)));
  }

  /**
   * Piping method
   * @example
   * const a = (s:string) => s.toUpperCase()
   * const b = (s:string) => `a_${s}_a`
   * const s = () => 'pipe'
   * fun(s)
   * .p(a)
   * .p(b)
   * .p(console.log)
   * .call()
   * // or
   * pipe('pipe')
   * .p(a)
   * .p(b)
   * .p(console.log)
   * .call()
   * "a_PIPE_a"
   */
  public p<Z>(h: (y: Y) => Z): Fun<X, Z> {
    return fun((x: X) => h(this.apply(x)));
  }
}

export function pipe<X>(x: X): Fun<void, X> {
  return fun(() => x);
}

function fun<X, Y>(f: (x: X) => Y): Fun<X, Y> {
  return new Fun(f);
}
/* export function compose<X, Y>(f: F<X, Y>): Compose<X, Y> {
  return new Compose(f);
} */
/* export function compose<X, Y, Z>(f: F<Y, Z>, h: F<X, Y>): F<X, Z> {
  return (x: X) => f(h(x));
} */

export function mapDebug<X>(x: X, logger: Logger): X {
  logger.debug(x);
  return x;
}

export function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}
