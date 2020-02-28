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

function directoryIsEmpty(path) {
  const files = fs.readdirSync(path);
  return !files.length;
}

module.exports = {
  description: '',

  fileMapTokens: function() {
    return {
      __application__: function() {
        return '/app/application';
      },
      __styles__: function() {
        return '/app/styles';
      },
      __root__: function() {
        return '/';
      },
      __public__: function() {
        return '/public';
      },
    };
  },

  podifyApp() {
    if (fs.existsSync('app/controllers/.gitkeep')) {
      fs.unlinkSync('app/controllers/.gitkeep');
    }
    if (fs.existsSync('app/routes/.gitkeep')) {
      fs.unlinkSync('app/routes/.gitkeep');
    }
    if (fs.existsSync('app/templates/components/.gitkeep')) {
      fs.unlinkSync('app/templates/components/.gitkeep');
    }
    if (fs.existsSync('app/templates/application.hbs')) {
      fs.unlinkSync('app/templates/application.hbs');
    }

    [
      'app/controllers',
      'app/templates/components',
      'app/templates',
      'app/routes',
    ].forEach(function(path) {
      if (fs.existsSync(path) && directoryIsEmpty(path)) {
        fs.rmdirSync(path);
      }
    });
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
        name: 'ember-cli-mirage',
        target: '1.1.6',
      },
      {
        name: 'ember-cli-sass',
        target: '10.0.1',
      },
    ];

    this.ui.writeLine('Renaming app.css -> app.scss');
    this.useSCSSInsteadOfCSS();

    this.ui.writeLine('Podifying the app');
    this.podifyApp();

    return blueprint
      .insertIntoFile('app/router.js', '\n  nrgRoutes(this);', {
        after: 'Router.map(function() {',
      })
      .then(function() {
        return blueprint.insertIntoFile(
          'app/router.js',
          "\nimport nrgRoutes from 'ember-nrg-ui/router';",
          {
            after: "import config from './config/environment';",
          }
        );
      })
      .then(function() {
        return blueprint.insertIntoFile('ember-cli-build.js', appImportChunk, {
          after:
            "const EmberApp = require('ember-cli/lib/broccoli/ember-app');",
        });
      })
      .then(function() {
        return blueprint.insertIntoFile('ember-cli-build.js', appChunk, {
          after: 'const app = new EmberApp(defaults, {',
        });
      })
      .then(function() {
        return blueprint.addAddonsToProject({
          packages: nodePackages,
        });
      })
      .then(function() {
        return blueprint.removePackageFromProject('ember-welcome-page');
      })
      .then(function() {
        return blueprint.insertIntoFile(
          'app/styles/app.scss',
          "@import 'nrg-override';"
        );
      });
  },

  normalizeEntityName: function() {},
};
