// Types for compiled templates
declare module 'ember-nrg-ui/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

// ember-cli-app-version does not provide types
declare module 'ember-cli-app-version/utils/regexp' {
  export const shaRegExp: RegExp;
  export const versionExtendedRegExp: RegExp;
  export const versionRegExp: RegExp;
}
