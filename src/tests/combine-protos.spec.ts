import { combineProtos } from '../combine-protos';

describe('combine-protos', () => {
  test('basic', async () => {
    const combined = combineProtos([`${__dirname}/protos`], []);
    expect(combined).toMatchSnapshot();
  });
});
