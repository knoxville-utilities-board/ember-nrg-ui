import { helper } from '@ember/component/helper';
import config from 'ember-get-config';
import {
  shaRegExp,
  versionExtendedRegExp,
  versionRegExp,
} from 'ember-cli-app-version/utils/regexp';

const {
  APP: { version, commitsSinceLastTag },
} = config;

export function appVersion() {
  const isTag = commitsSinceLastTag == 0;
  if (!isTag) {
    return version.match(shaRegExp)?.[0];
  }
  return (
    version.match(versionExtendedRegExp)?.[0] ??
    version.match(versionRegExp)?.[0]
  );
}

export default helper(appVersion);
