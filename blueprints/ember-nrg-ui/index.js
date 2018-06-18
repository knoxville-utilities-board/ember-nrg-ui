/*jshint node:true*/
const fs = require('fs');

const environmentChunk = `
    flashMessageDefaults: {
      timeout: 7000,
      type: 'info',
      types: ['positive', 'success', 'negative', 'error', 'info', 'warning'],
      showProgress: false
    },
    moment: {
      allowEmpty: true,
      includeTimezone: 'all',
    },`;

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

  fileMapTokens: function() {
    return {
      __markdown__: function() {
        return '/markdown';
      },
      __application__: function() {
        return '/app/application';
      },
      __root__: function() {
        return '/';
      },
      __public__: function() {
        return '/public';
      },
      __index_route__: function() {
        return '/app/index';
      },
    };
  },

  afterInstall() {
    var blueprint = this;
    var nodePackages = [{
      name: 'ember-cli-sass',
      target: '^6.1.1'
    }, {
      name: 'ember-cli-mirage',
      target: '^0.3.3'
    }];

    if (fs.existsSync('app/styles/app.css')) {
      console.log("  Renaming app.css -> app.scss");
      fs.renameSync('app/styles/app.css', 'app/styles/app.scss');
    }
    console.log("  Podifying the app");
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

    return blueprint.insertIntoFile('config/environment.js', environmentChunk, {
      after: "locationType: 'auto',"
    }).then(function() {
      return blueprint.insertIntoFile('app/router.js', "\n  nrgRoutes(this);", {
        after: "Router.map(function() {"
      });
    }).then(function() {
      return blueprint.insertIntoFile('app/router.js', "\nimport nrgRoutes from 'ember-nrg-ui/router';", {
        after: "import config from './config/environment';"
      });
    }).then(function() {
      return blueprint.insertIntoFile('ember-cli-build.js', appImportChunk, {
        after: "const EmberApp = require('ember-cli/lib/broccoli/ember-app');"
      });
    }).then(function() {
      return blueprint.insertIntoFile('ember-cli-build.js', appChunk, {
        after: "const app = new EmberApp(defaults, {"
      });
    }).then(function() {
      return blueprint.addPackagesToProject(nodePackages);
    }).then(function() {
      return blueprint.removePackageFromProject('ember-welcome-page');
    });
  },

  normalizeEntityName: function() {}
};
