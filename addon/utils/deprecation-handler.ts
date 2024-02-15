import { deprecate as emberDeprecate } from '@ember/debug';
import GLOBAL_DEPRECATIONS from 'ember-nrg-ui/global-deprecations';

import type { Available, Enabled } from '@ember/debug';

export function AddNrgDeprecations(...deprecations: Deprecation[]) {
  return function (target: typeof Object) {
    const targetClass = target;
    const targetName = targetClass.name;
    return class extends targetClass {
      constructor(...args: unknown[]) {
        super(...args);
        enforceGlobalDeprecations(this, [targetName]);
        enforceDeprecations(this, [targetName], deprecations);
      }
    };
  };
}

export type Deprecation = {
  id: string;
  affected?: unknown[];
  test: (target: unknown) => boolean;
  message: string | ((target: unknown) => string);
  since: Available | Enabled;
  until: string;
  url?: string;
  for?: string;
};

function enforceDeprecations(
  target: unknown,
  replacements: string[],
  deprecations: Deprecation[]
) {
  for (const deprecation of deprecations) {
    const isAffected = deprecation.affected?.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (affected: any) => target instanceof affected
    );
    if ((isAffected || isAffected === undefined) && deprecation.test(target)) {
      let message = deprecation.message;
      if (typeof message === 'function') {
        message = message(target);
      }
      message = buildMessage(message, ...replacements);
      emberDeprecate(message, false, {
        id: 'ember-nrg-ui:' + deprecation.id,
        until: deprecation.until,
        url: deprecation.url,
        for: deprecation.for ?? 'ember-nrg-ui',
        since: deprecation.since,
      });
    }
  }
}

function enforceGlobalDeprecations(target: unknown, replacements: string[]) {
  enforceDeprecations(target, replacements, GLOBAL_DEPRECATIONS);
}

function buildMessage(message: string, ...args: string[]) {
  let index = 0;
  return message.replace(/%d|%s/g, () => args[index++] ?? '');
}
