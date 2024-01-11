import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

// Add extensions here, such as ts, gjs, etc that you may import
const extensions = ['.js'];

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['breakpoints.js', 'components/nrg-appbar.js', 'components/nrg-application-error.js', 'components/nrg-application.js', 'components/nrg-button.js', 'components/nrg-checkbox.js', 'components/nrg-context-item.js', 'components/nrg-context-menu.js', 'components/nrg-datetime.js', 'components/nrg-datetime/calendar.js', 'components/nrg-dropdown.js', 'components/nrg-dropdown/item.js', 'components/nrg-dropdown/menu.js', 'components/nrg-dropdown/sub-menu.js', 'components/nrg-form-action.js', 'components/nrg-form-container.js', 'components/nrg-form-field.js', 'components/nrg-form-field/segment.js', 'components/nrg-home-cards.js', 'components/nrg-home-cards/home-card.js', 'components/nrg-icon.js', 'components/nrg-lightbox-container.js', 'components/nrg-lightbox-thumbnail.js', 'components/nrg-list.js', 'components/nrg-list/default-list-item.js', 'components/nrg-list/header.js', 'components/nrg-list/header/filter.js', 'components/nrg-list/header/search.js', 'components/nrg-list/items.js', 'components/nrg-loading-indicator.js', 'components/nrg-modal-container.js', 'components/nrg-modal-container/modal-wrapper.js', 'components/nrg-modal.js', 'components/nrg-new-features.js', 'components/nrg-not-found.js', 'components/nrg-popup.js', 'components/nrg-popup/popup.js', 'components/nrg-progress-bar.js', 'components/nrg-radio.js', 'components/nrg-render-template-block.js', 'components/nrg-responsive-takeover.js', 'components/nrg-search.js', 'components/nrg-side-by-side.js', 'components/nrg-sidebar-menu.js', 'components/nrg-sidebar-menu/group.js', 'components/nrg-sidebar-menu/item.js', 'components/nrg-sidebar.js', 'components/nrg-text-area.js', 'components/nrg-text-field.js', 'components/nrg-text-field/trim-input.js', 'components/nrg-toast-container.js', 'components/nrg-toast.js', 'components/nrg-validation-component.js', 'decorators/validation.js', 'global-deprecations.js', 'helpers/exists.js', 'helpers/format-currency.js', 'helpers/format-date.js', 'helpers/format-number.js', 'helpers/list-group-header.js', 'helpers/list-item-selectable.js', 'helpers/nrg-app-version.js', 'helpers/unformat.js', 'initializers/config-override.js', 'initializers/dayjs-plugins.js', 'initializers/deprecation-handler.js', 'initializers/flash-message-timer.js', 'instance-initializers/breakpoints-override.js', 'modifiers/focus-first-input.js', 'modifiers/on-click-outside.js', 'modifiers/on-resize.js', 'router.js', 'services/application.js', 'services/context-menu.js', 'services/lightbox.js', 'services/modal.js', 'services/responsive.js', 'services/whats-new.js', 'utils/deprecation-handler.js', 'utils/ensure-path-exists.js', 'utils/modifier-keys.js', 'utils/object-hash.js', 'utils/special-characters.js']),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['breakpoints.js', 'components/nrg-appbar.js', 'components/nrg-application-error.js', 'components/nrg-application.js', 'components/nrg-button.js', 'components/nrg-checkbox.js', 'components/nrg-context-item.js', 'components/nrg-context-menu.js', 'components/nrg-datetime.js', 'components/nrg-datetime/calendar.js', 'components/nrg-dropdown.js', 'components/nrg-dropdown/item.js', 'components/nrg-dropdown/menu.js', 'components/nrg-dropdown/source.js', 'components/nrg-dropdown/sub-menu.js', 'components/nrg-form-action.js', 'components/nrg-form-container.js', 'components/nrg-form-field.js', 'components/nrg-form-field/segment.js', 'components/nrg-home-cards.js', 'components/nrg-home-cards/home-card.js', 'components/nrg-icon.js', 'components/nrg-lightbox-container.js', 'components/nrg-lightbox-thumbnail.js', 'components/nrg-list.js', 'components/nrg-list/default-list-item.js', 'components/nrg-list/header.js', 'components/nrg-list/header/filter.js', 'components/nrg-list/header/search.js', 'components/nrg-list/items.js', 'components/nrg-loading-indicator.js', 'components/nrg-modal-container.js', 'components/nrg-modal-container/modal-wrapper.js', 'components/nrg-modal.js', 'components/nrg-new-features.js', 'components/nrg-not-found.js', 'components/nrg-popup.js', 'components/nrg-popup/popup.js', 'components/nrg-progress-bar.js', 'components/nrg-radio.js', 'components/nrg-render-template-block.js', 'components/nrg-responsive-takeover.js', 'components/nrg-search.js', 'components/nrg-side-by-side.js', 'components/nrg-sidebar-menu.js', 'components/nrg-sidebar-menu/group.js', 'components/nrg-sidebar-menu/item.js', 'components/nrg-sidebar.js', 'components/nrg-text-area.js', 'components/nrg-text-field.js', 'components/nrg-text-field/trim-input.js', 'components/nrg-toast-container.js', 'components/nrg-toast.js', 'helpers/exists.js', 'helpers/format-currency.js', 'helpers/format-date.js', 'helpers/format-number.js', 'helpers/list-group-header.js', 'helpers/list-item-selectable.js', 'helpers/nrg-app-version.js', 'initializers/config-override.js', 'initializers/dayjs-plugins.js', 'initializers/deprecation-handler.js', 'initializers/flash-message-timer.js', 'instance-initializers/breakpoints-override.js', 'modifiers/focus-first-input.js', 'modifiers/on-click-outside.js', 'modifiers/on-resize.js', 'services/application.js', 'services/context-menu.js', 'services/lightbox.js', 'services/modal.js', 'services/responsive.js', 'services/whats-new.js', 'templates/application-error.js', 'templates/application-loading.js', 'templates/not-found.js', 'utils/ensure-path-exists.js']),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    babel({
      babelHelpers: 'bundled',
      extensions,
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),

    // Copy Readme and License into published package
    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
      ],
    }),
  ],
};
