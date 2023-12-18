import { generateHostMappings } from '../generate-host-mappings';

describe('generate-host-mappings', () => {
  test('basic', async () => {
    const mappings = generateHostMappings(`${__dirname}/temp/protos`);
    expect(mappings).toEqual({ test1: 'dummy', test2: 'dummy' });
  });
});
