# ember-nrg-ui

[![NPM][npm-badge-img]][npm-badge-link]

Ember NRG UI

## Compatibility

- Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v14 or above

![Logo](https://knoxville-utilities-board.github.io/ember-nrg-ui/images/nrg-logo.svg)

Ember NRG UI is an opinionated UI addon based on how KUB scaffolds web applications.
The addon provides the skeleton of an Ember app so that a developer can immediately start solving a business problem.
It includes an application shell with sidebar navigation and typical UI components to get you started.

## What it does

- Overwrites `application.hbs` to use `nrg-application` component
- Converts the application to use Sass
- Adds route `404 Not Found`
- Modifies `config/environment.js`
- Modifies `ember-cli-build.js`
- Installs `ember-cli-mirage` and `ember-cli-sass`
- Uninstalls `ember-welcome-page`
- Adds `public/.htaccess` file
- Adds `app/styles/_nrg-override.scss` for theming

## Example App

Ember NRG UI comes with a [dummy app](tests/dummy) that implements all of the components.
**Check out that dummy app for reference**. To start it, run

```bash
git clone git@github.com:knoxville-utilities-board/ember-nrg-ui.git
cd ember-nrg-ui
pnpm install && ember serve
```

and go to <http://localhost:4200>.

## Installation

Installing the library is as easy as:

```bash
ember install ember-nrg-ui
```

See the [Contributing](CONTRIBUTING.md) guide for details.

## Getting Started

Once the addon is installed, create a new index route and template:

```hbs
<!-- app/index/template.hbs -->

<div class='ui segment basic'>
  <NrgHomeCards as |view|>
    <view.home-card
      @label='Hello World'
      @icon='globe'
      @route='index'
      @meta='obligatory'
    />
  </NrgHomeCards>
</div>
```

### Theming

Use the `_nrg-override.scss` file to override base colors and Logo

```scss
// app/styles/_nrg-override.scss

$primary: #6200ee;
$primaryVariant: #3700b3;

.nrg-application.nrg-application.nrg-application,
.ui.modal.side-by-side--takeover.side-by-side--takeover.side-by-side--takeover {
  .main.menu.menu {
    background-color: rgba($primary, 0.98);
  }
}

.nrg-list.nrg-list.nrg-list .items > .item.active.active {
  background-color: $primary;
  & .description,
  & .description > a,
  & .header,
  & .meta,
  & > .icon {
    color: #fff;
  }
}

.home-card.home-card.home-card.home-card .image.icon {
  background-color: $primaryVariant;
}
```

Import the override file into the main `app.scss`

```scss
// app/styles/app.scss

@import 'nrg-override';
```

[npm-badge-img]: https://badge.fury.io/js/ember-nrg-ui.svg
[npm-badge-link]: http://badge.fury.io/js/ember-nrg-ui

### Displaying Environment In App Bar

By default, every environment will be displayed in the App Bar except for `prod`.
To change this, add an array property called `productionEnvironments` to the `ENV` variable in the `config/environment.js` file for your app.
For example, if your production environments are `prd` and `prod` the `environment.js` file would look something like this:

```javascript
module.exports = function(/* environment, appConfig */) {
  const ENV = {
    ...
    'ember-nrg-ui': {
      productionEnvironments: ['prd', 'prod'] // <- Look Here
    }
    ...
  }
  return ENV;
};
```
