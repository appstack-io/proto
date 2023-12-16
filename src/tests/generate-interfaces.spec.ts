import { combineProtos } from '../combine-protos';
import { generateInterfaces } from '../generate-interfaces';

describe('generate-interfaces', () => {
  test('basic', async () => {
    const combined = combineProtos([`${__dirname}/protos`], []);
    const interfaces = generateInterfaces(combined);
    expect(interfaces).toMatchInlineSnapshot(`
      "import { Empty } from './google/protobuf/empty';

      import { Observable } from 'rxjs';"
    `);
  });
});
