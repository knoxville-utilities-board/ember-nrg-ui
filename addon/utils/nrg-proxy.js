import { get, set } from '@ember/object';
import { deprecate } from '@ember/debug';

const DEFAULT_HANDLER = {
  get: (target, prop) => {
    return get(target, prop);
  },
  set: (target, prop, value) => {
    set(target, prop, value);
    return true;
  },
  deleteProperty: (target, prop) => {
    delete target[prop];
    return true;
  },
  has: (target, prop) => {
    return prop in target;
  },
  ownKeys: (target) => {
    return Object.keys(target);
  },
  getOwnPropertyDescriptor: (target, prop) => {
    return Object.getOwnPropertyDescriptor(target, prop);
  },
  defineProperty: (target, prop, descriptor) => {
    Object.defineProperty(target, prop, descriptor);
    return true;
  },
  getPrototypeOf: (target) => {
    return Object.getPrototypeOf(target);
  },
  setPrototypeOf: (target, prototype) => {
    Object.setPrototypeOf(target, prototype);
    return true;
  },
  isExtensible: (target) => {
    return Object.isExtensible(target);
  },
  preventExtensions: (target) => {
    Object.preventExtensions(target);
    return true;
  },
  apply: (target, thisArg, argumentsList) => {
    return target.apply(thisArg, argumentsList);
  },
  construct: (target, argumentsList) => {
    return new target(...argumentsList);
  },
};

export default class NrgProxy {
  #proxy = null;
  #target = null;

  constructor(target) {
    this.#target = target;
    this.#proxy = new Proxy(target, DEFAULT_HANDLER);
  }

  get content() {
    deprecate(
      `Accessing \`nrgProxy.content\` is deprecated. Please use nrgProxy instead.`,
      false,
      {
        id: 'ember-nrg-ui.proxy.get-content',
        until: '5.0.0',
      }
    );
    return this.#target;
  }

  set content(value) {
    deprecate(
      `Setting \`nrgProxy.content\` is deprecated. Please construct a new proxy instead.`,
      false,
      {
        id: 'ember-nrg-ui.proxy.set-content',
        until: '5.0.0',
      }
    );
    this.#target = value;
    this.#proxy = new Proxy(value, DEFAULT_HANDLER);
  }

  get(property) {
    deprecate(
      `Accessing \`nrgProxy.get('${property}')\` is deprecated. Please use \`nrgProxy.${property}\` instead.`,
      false,
      {
        id: 'ember-nrg-ui.proxy.get',
        until: '5.0.0',
      }
    );
    return get(this.#proxy, property);
  }

  set(property, value) {
    deprecate(
      `Accessing \`nrgProxy.set('${property}', '${value}')\` is deprecated. Please use \`nrgProxy.${property} = ${value}\` instead.`,
      false,
      {
        id: 'ember-nrg-ui.proxy.set',
        until: '5.0.0',
      }
    );
    set(this.#proxy, property, value);
  }
}
