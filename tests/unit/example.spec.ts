
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

describe("Unit management", () => {
  describe('Take .env value as default value', () => {
    const originalEnv = process.env;
    type TestTuple = [string];
    describe.each<TestTuple>([
        [ "metric" ], [ "imperial" ]
      ])('when process.env.NODE_ENV="%s"', (unit => {
          beforeEach(() => {
            jest.resetModules();
            process.env = {
              ...originalEnv,
              VUE_APP_DEFAULT_UNIT: unit,
            };
          });

          afterEach(() => {
            process.env = originalEnv;
          });

          const localVue = createLocalVue()
          localVue.use(Vuex)

          it(`Default unit should be ${unit}`, () => {
            const store = new Vuex.Store({ modules: { weather: require('@/store/weather').default } })
            expect(store.getters['weather/activeUnit'].value).toBe(unit);
        });
      })
    )
  });
});
