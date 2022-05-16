const fnMap = new Map<string, Function>();

module.exports = (args: unknown & { __fnStr__: string }) => {
  const { __fnStr__, ...obj } = args;
  let fn = fnMap.get(__fnStr__)!;

  if (!fn) {
    fn = eval(__fnStr__);
    fnMap.set(__fnStr__, fn);
  }

  return fn(obj);
};
