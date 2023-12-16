import { protoBuild } from '../proto-build';

describe('proto-build', () => {
  test('basic', async () => {
    await protoBuild({
      projectDir: `${__dirname}/../..`,
      protoDir: `src/tests/temp`,
      exclude: [],
      combinedName: 'combined',
      clientDir: 'client',
    });
  });
});
