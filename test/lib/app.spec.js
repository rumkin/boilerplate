const should = require('should');
const App = require('../../src/lib/app.js');
const Service = require('../../src/lib/service.js');

describe('App', function() {
  class TestService extends Service {
    startService() {
      this.isStarted = true;
    }

    stopService() {
      this.isStarted = false;
    }

    test() {
      return 1;
    }
  }

  it('should copy configuration', () => {
    const app = new App({
      test: {
        value: 1,
      },
    });


  });

  it('Should instantiate and produce api object', function() {
    const app = new App();

    // Define single service test
    app.register('test', new TestService());

    const {api} = app;

    should(api).has.ownProperty('test')
    .has.property('test').is.Function();

    should(api.test.test()).equal(1);
  });

  it('Should decline duplicated services', function() {
    const app = new App();

    app.register('test', new TestService());

    // Try to register service with the same name
    should(() => app.register('test', new TestService()))
    .throw(/already exists/);
  });

  it('Should call start method for services', async function() {
    const app = new App();

    app.register('test', new TestService());

    await app.start();
    should(app.api.test.isStarted).equals(true);

    await app.stop();
    should(app.api.test.isStarted).equals(false);
  });
});
