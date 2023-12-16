import { generateModuleProtos } from '../generate-module-protos';

describe('generate-module-protos', () => {
  test('basic', async () => {
    await generateModuleProtos(`${__dirname}/modules`, []);
  });
});
