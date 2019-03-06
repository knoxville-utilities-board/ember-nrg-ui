import { helper } from '@ember/component/helper';
import config from 'ember-get-config';
import { shaRegExp } from 'ember-cli-app-version/utils/regexp';

const {
  APP: { version },
} = config;

export function appVersion() {
  const parts = version.split('+');
  const isTag = parts.length === 1;
  let displayVersion = `v${version}`;

  if (!isTag) {
    displayVersion = version.match(shaRegExp)[0];
  }

  return displayVersion;
}

export default helper(appVersion);
