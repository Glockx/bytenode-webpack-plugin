import { runWebpack } from './runner';
import type { Configuration } from './runner';

console.log = jest.fn();
console.debug = jest.fn();

const webpackOptions: Configuration = {
  devtool: 'source-map',
  entry: './fixtures/first.js',
  infrastructureLogging: {
    console,
    debug: true,
    level: 'verbose',
  },
  stats: {
    logging: 'verbose',
    loggingDebug: true,
  },
};

describe('plugin option: preventSourceMaps', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should prevent source map generation when true', async () => {
    const assets = await runWebpack(webpackOptions, {
      preventSourceMaps: true,
    });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Preventing source maps from being generated'));

    expect(assets?.sort()).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

  // test('should not prevent source map generation when true', async () => {
  //   const assets = await runWebpack(webpackOptions, {
  //     preventSourceMaps: false,
  //   });
  //
  //   expect(console.log).toHaveBeenCalledTimes(0);
  //
  //   expect(assets?.sort()).toStrictEqual([
  //     // some .map file
  //     'main.compiled.jsc',
  //     'main.js',
  //   ]);
  // });

});
