import path from 'path';
import Piscina from 'piscina';

const filename = path.resolve(__dirname, 'worker.js');

export const threadPoolFactory = (options?: ConstructorParameters<typeof Piscina>[0]) => {
  const pool = new Piscina({ ...options, filename });

  return <T, R>(fn: (args: T) => R | Promise<R>, args?: T, options?: Parameters<Piscina['run']>[1]): Promise<R> => {
    const __fnStr__ = fn.toString();
    return pool.run({ ...args, __fnStr__ }, { ...options, filename });
  };
};
