import { combineProtos } from '../combine-protos';

describe('combine-protos', () => {
  test('basic', async () => {
    const combined = combineProtos([`${__dirname}/temp/protos`], []);
    expect(combined).toMatchSnapshot();
  });
});
