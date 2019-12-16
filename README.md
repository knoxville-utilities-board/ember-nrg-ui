# ember-nrg-ui

[![Build Status][build-status-img]][build-status-link]
[![NPM][npm-badge-img]][npm-badge-link]

Ember NRG UI **supports Ember.js versions from 2.x to 3.3**

![Logo](https://knoxville-utilities-board.github.io/ember-nrg-ui/images/nrg-logo.svg)

Ember NRG UI is an opinionated UI addon based on how KUB scaffolds web applications.
The addon provides the skeleton of an Ember app so that a developer can immediately start solving a business problem.
It includes an application shell with sidebar navigation, typical UI components, and a Release Notes route implementation to get you started.

## What it does

* Overwrites `.ember-cli`
* Overwrites `application.hbs` to use `nrg-application` component
* Converts the application to `Pods`
* Converts the application to use Sass
* Adds routes `/release-notes` and `404 Not Found`
* Modifies `config/environment.js`
* Modifies `ember-cli-build.js`
* Installs `ember-cli-mirage` and `ember-cli-sass`
* Uninstalls `ember-welcome-page`
* Adds `public/.htaccess` file
* Adds `app/styles/_nrg-override.scss` for theming

## Example App

Ember NRG UI comes with a [dummy app](tests/dummy) that implements all of the components.
**Check out that dummy app for reference**. To start it, run

    git clone git@github.com:knoxville-utilities-board/ember-nrg-ui.git
    cd ember-nrg-ui
    yarn install && ember serve

and go to <http://localhost:4200>.

## Installation

Installing the library is as easy as:

```bash
ember install ember-nrg-ui
```

## Getting Started

### Hello World

Once the addon is installed, create a new index route and template:

```javascript
// app/index/route.js

import Route from "@ember/routing/route";
import SidebarNavigationMixin from "ember-nrg-ui/mixins/sidebar-navigation";

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: "Home"
});
```

```html
<!-- app/index/template.hbs -->

<div class="ui segment basic">
  {{#nrg-home-cards as |view|}}
    {{view.home-card label="Hello World" icon="globe" route="index" meta="obligatory" }}
  {{/nrg-home-cards}}
</div>
```

### Context Menu

Use the `ContextMenuMixin` to route the user to Release Notes by creating
an application route.

```javascript
// app/application/route.js

import Route from "@ember/routing/route";
import ContextMenuMixin from "ember-nrg-ui/mixins/context-menu";

export default Route.extend(ContextMenuMixin, {
  contextItems: [
    {
      label: "Release Notes",
      actionName: "routeToReleaseNotes",
      priority: 2
    }
  ],

  actions: {
    routeToReleaseNotes() {
      this.transitionTo("release-notes");
    }
  }
});
```

### Theming

Use the `_nrg-override.scss` file to override base colors and Logo

```scss
// app/styles/_nrg-override.scss

$primary: #6200ee;
$primaryVariant: #3700b3;

.nrg-application.nrg-application.nrg-application > .main.menu {
  background-color: rgba($primary, 0.98);
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

@import "nrg-override";
```

[build-status-img]: https://dev.azure.com/knoxville-utilities-board/ember-nrg-ui/_apis/build/status/knoxville-utilities-board.ember-nrg-ui?branchName=master
[build-status-link]: https://dev.azure.com/knoxville-utilities-board/ember-nrg-ui/_build/latest?definitionId=1&branchName=master
[npm-badge-img]: https://badge.fury.io/js/ember-nrg-ui.svg
[npm-badge-link]: http://badge.fury.io/js/ember-nrg-ui

### Displaying Environment In App Bar

By default, every environment will be displayed in the App Bar except for `prod`.
To change this modify the `productionEnvironments` array `config/environments.js`.
