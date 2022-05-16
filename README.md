# piscina-microjob
CPU bound routines over Piscina thread pool

Inspired by https://github.com/wilk/microjob, but uses https://github.com/piscinajs/piscina as thread pool

### Example

```typescript
import { threadPoolFactory } from 'piscina-microjob';

const thread = threadPoolFactory({
  // ... https://github.com/piscinajs/piscina#class-piscina options can be passed
});

const resp = await thread(({n}) => n + 1, { n: 1 }, {
  // https://github.com/piscinajs/piscina#method-runtask-options options can be passed
});

resp; // 2
```
