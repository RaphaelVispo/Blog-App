import tap from 'tap';
import 'must/register.js';

import { build } from '../../src/app.js';

tap.mochaGlobals();

describe('/api should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });
  it('should return {success: true}', async () => {
    const respose = await app.inject({
      method: 'GET',
      url: '/api'
    });

    respose.statusCode.must.be.equal(200);
    const result = await respose.json();

    result.success.must.be.true();
  });
});
