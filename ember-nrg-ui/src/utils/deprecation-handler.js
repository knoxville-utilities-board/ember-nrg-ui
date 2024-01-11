import { deprecate as emberDeprecate } from '@ember/debug';
import GLOBAL_DEPRECATIONS from 'ember-nrg-ui/global-deprecations';

export function AddNrgDeprecations(...deprecations) {
  return function (target) {
    const targetClass = target;
    const targetName = targetClass.name;
    return class extends targetClass {
      constructor() {
        super(...arguments);
        enforceGlobalDeprecations(this, [targetName]);
        enforceDeprecations(this, [targetName], deprecations);
      }
    };
  };
}

function enforceDeprecations(target, replacements, deprecations) {
  for (const deprecation of deprecations) {
    const isAffected = deprecation.affected?.some(
      (affected) => target instanceof affected
    );
    if ((isAffected || isAffected === undefined) && deprecation.test(target)) {
      let message = deprecation.message;
      if (typeof deprecation.message === 'function') {
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

function enforceGlobalDeprecations(target, replacements) {
  enforceDeprecations(target, replacements, GLOBAL_DEPRECATIONS);
}

function buildMessage(message, ...args) {
  let index = 0;
  return message.replace(/%d|%s/g, () => args[index++] ?? '');
}
