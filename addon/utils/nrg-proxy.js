import { get, set } from '@ember/object';
import { deprecate } from '@ember/debug';

function copyObject(to, from) {
  const propertiesToDelete = Object.getOwnPropertyNames(
    Object.getPrototypeOf(to)
  );
  for (const key of propertiesToDelete) {
    delete to[key];
  }

  const propertiesToCopy = Object.getOwnPropertyNames(
    Object.getPrototypeOf(from)
  );
  for (const key of propertiesToCopy) {
    set(to, key, from[key]);
  }
}

export default class NrgProxy {
  constructor(target = {}) {
    this.target = target;
    return new Proxy(this, this);
  }

  get(_, property, viaGetter = true) {
    if (property === 'get') {
      return (_property) => {
        deprecate(
          'Accessing `nrgProxy.' +
            (viaGetter ? _property : `get('${_property}')`) +
            ` is deprecated. Please use \`nrgProxy.${_property}\` instead.`,
          false,
          {
            id: 'ember-nrg-ui.proxy.get',
            for: 'ember-nrg-ui',
            since: '4.4.0',
            until: '5.0.0',
          }
        );
        return this.get(this.target, _property, false);
      };
    }
    if (property === 'set') {
      return (_property, value) => {
        deprecate(
          `Accessing \`nrgProxy.set('${_property}', '${value}')\` is deprecated. Please use \`nrgProxy.${_property} = '${value}'\` instead.`,
          false,
          {
            id: 'ember-nrg-ui.proxy.set',
            for: 'ember-nrg-ui',
            since: '4.4.0',
            until: '5.0.0',
          }
        );
        return this.set(this.target, _property, value, false);
      };
    }
    if (property === 'content') {
      deprecate(
        `Setting \`nrgProxy.content\` is deprecated. Please use a new instance of \`NrgProxy\` instead.`,
        false,
        {
          id: 'ember-nrg-ui.proxy.content',
          for: 'ember-nrg-ui',
          since: '4.4.0',
          until: '5.0.0',
        }
      );
      return this.target;
    }
    if (property?.startsWith('content.')) {
      const innerProperty = property.replace('content.', '');
      return get(this.target, innerProperty);
    }

    return get(this.target, property);
  }

  set(target, property, value) {
    if (property === 'content') {
      deprecate(
        `Accessing \`nrgProxy.content = ' + ${value}'\` is deprecated. Please use \`nrgProxy = '${value}'\` instead.`,
        false,
        {
          id: 'ember-nrg-ui.proxy.content',
          for: 'ember-nrg-ui',
          since: '4.4.0',
          until: '5.0.0',
        }
      );

      copyObject(this.target, value);
    } else if (property?.startsWith('content.')) {
      const innerProperty = property.replace('content.', '');
      set(this.target, innerProperty, value);
    } else {
      set(this.target, property, value);
    }
    return true;
  }
}
