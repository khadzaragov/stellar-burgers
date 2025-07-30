import { defineConfig } from 'cypress';
import webpackConfig from './webpack.config.js';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const { startDevServer } = require('@cypress/webpack-dev-server');
      on('dev-server:start', (options) => startDevServer({ options, webpackConfig }));
      return config;
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4000',
    supportFile: 'cypress/support/e2e.ts'
  }
});