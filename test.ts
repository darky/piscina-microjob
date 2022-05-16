import assert from 'assert';
import { threadPoolFactory } from '.';

// TODO rewrite to ESM when @types/node >= 18
const test: Function = require('node:test');

const thread = threadPoolFactory();

test('sync', async () => {
  const resp = await thread(({ n }: { n: number }) => n + 1, { n: 0 });
  assert.equal(resp, 1);
});

test('async', async () => {
  const resp = await thread(async ({ n }: { n: number }) => n + 1, { n: 0 });
  assert.equal(resp, 1);
});

test('error', async () => {
  const resp = await thread(() => {
    throw new Error('test');
  }).catch((e: Error) => e);

  assert.equal(resp.message, 'test');
});

test('eval fn error', async () => {
  const resp = (await thread(123 as any).catch((e: Error) => e)) as Error;

  assert.equal(resp.message, 'fn is not a function');
});
