/* eslint-env node */
'use strict';
const path = require('path');
const walkSync = require('walk-sync');
const getGitInfo = require('git-repo-info');

module.exports = {
  name: require('./package').name,

  blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },

  included: function (app) {
    this._super.included.apply(this, arguments);

    const cssSource = 'node_modules/fomantic-ui-css';
    app.import({
      development: path.join(cssSource, 'semantic.css'),
      production: path.join(cssSource, 'semantic.min.css'),
    });

    const fontSource =
      'node_modules/fomantic-ui-css/themes/default/assets/fonts';
    const fontFiles = walkSync(fontSource, {
      directories: false,
    });
    const fontOptions = {
      destDir: 'assets/themes/default/assets/fonts',
    };
    for (let font of fontFiles) {
      app.import(path.join(fontSource, font), fontOptions);
    }
  },

  config(env, baseConfig) {
    let config = this._super.config.apply(this, arguments);
    if (!baseConfig.APP) {
      return config;
    }
    const gitInfo = getGitInfo();
    baseConfig.APP.commitsSinceLastTag = gitInfo.commitsSinceLastTag;
    return config;
  },
};
