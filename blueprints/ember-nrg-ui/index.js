/* eslint-env node */
const fs = require('fs');

const appImportChunk = `
const config = require('./config/environment');
const emberENV = process.env.EMBER_ENV;
const ENV = config(emberENV);`;

const appChunk = `
    fingerprint: {
      enabled: emberENV === 'review' || emberENV === 'production',
      prepend: process.env.rootURL || ENV.rootURL,
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
    },`;

module.exports = {
  description: '',

  fileMapTokens: function () {
    return {
      __templates__: function () {
        return '/app/templates';
      },
      __styles__: function () {
        return '/app/styles';
      },
      __root__: function () {
        return '/';
      },
      __public__: function () {
        return '/public';
      },
    };
  },

  useSCSSInsteadOfCSS() {
    if (fs.existsSync('app/styles/app.css')) {
      fs.renameSync('app/styles/app.css', 'app/styles/app.scss');
    }
  },

  afterInstall() {
    const blueprint = this;
    const nodePackages = [
      {
        name: 'sass',
        target: '1.43.5',
      },
    ];
    const AddOns = [
      {
        name: 'ember-cli-mirage',
        target: '2.2.0',
      },
      {
        name: 'ember-cli-sass',
        target: '10.0.1',
      },
    ];

    this.ui.writeLine('Renaming app.css -> app.scss');
    this.useSCSSInsteadOfCSS();

    return blueprint
      .insertIntoFile('app/router.js', '\n  nrgRoutes(this);', {
        after: 'Router.map(function() {',
      })
      .then(function () {
        return blueprint.insertIntoFile(
          'app/router.js',
          "\nimport nrgRoutes from 'ember-nrg-ui/router';",
          {
            after: "import config from './config/environment';",
          }
        );
      })
      .then(function () {
        return blueprint.insertIntoFile('ember-cli-build.js', appImportChunk, {
          after:
            "const EmberApp = require('ember-cli/lib/broccoli/ember-app');",
        });
      })
      .then(function () {
        return blueprint.insertIntoFile('ember-cli-build.js', appChunk, {
          after: 'app = new EmberApp(defaults, {',
        });
      })
      .then(function () {
        return blueprint.addAddonsToProject({
          packages: AddOns,
        });
      }).then(function () {
        return blueprint.addPackageToProject({
          packages: nodePackages,
        });
      })
      .then(function () {
        return blueprint.removePackageFromProject('ember-welcome-page');
      })
      .then(function () {
        return blueprint.insertIntoFile(
          'app/styles/app.scss',
          "@import 'nrg-override';"
        );
      });
  },

  normalizeEntityName: function () { },
};
