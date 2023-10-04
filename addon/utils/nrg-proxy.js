import { get, set } from '@ember/object';
import { deprecate } from '@ember/debug';

/**
 * A proxy class that allows for tracking changes to an object.
 *
 * @class NrgProxy
 * @extends Proxy
 *
 * @example
 * import NrgProxy from 'ember-nrg-ui/utils/nrg-proxy';
 *
 * const proxy = new NrgProxy({ foo: 'bar' });
 *
 * proxy.foo; // 'bar'
 *
 * proxy.foo = 'baz';
 *
 * proxy.foo; // 'baz'
 *
 * delete proxy.foo;
 *
 * proxy.foo; // undefined
 */
export default class NrgProxy {
  #_target;

  get #target() {
    return this.#_target;
  }

  set #target(value) {
    this.#_target = value;
  }

  /**
   * Creates a new NrgProxy.
   * @param {Object} target
   * @returns {NrgProxy}
   */
  constructor(target) {
    return new Proxy(target, {
      get: (t, prop) => {
        return this.#target[prop];
      },
      set: (t, prop, value) => {
        this.#target[prop] = value;
        return true;
      },
      deleteProperty: (t, prop) => {
        delete this.#target[prop];
        return true;
      },
      has: (t, prop) => {
        return prop in this.#target;
      },
      ownKeys: () => {
        return Object.keys(this.#target);
      },
      getOwnPropertyDescriptor: (t, prop) => {
        return Object.getOwnPropertyDescriptor(this.#target, prop);
      },
      defineProperty: (t, prop, descriptor) => {
        Object.defineProperty(this.#target, prop, descriptor);
        return true;
      },
      getPrototypeOf: () => {
        return Object.getPrototypeOf(this.#target);
      },
      setPrototypeOf: (t, prototype) => {
        Object.setPrototypeOf(this.#target, prototype);
        return true;
      },
      isExtensible: () => {
        return Object.isExtensible(this.#target);
      },
      preventExtensions: () => {
        Object.preventExtensions(this.#target);
        return true;
      },
      apply: (t, thisArg, argumentsList) => {
        return this.#target.apply(thisArg, argumentsList);
      },
      construct: (t, argumentsList) => {
        return new this.#target(...argumentsList);
      },
    });
  }

  /**
   * Gets a property on the proxy.
   * @param {string} property
   * @returns {any}
   * @deprecated Use `nrgProxy.<property>` instead.
   */
  get(property) {
    deprecate(
      `Accessing a property via \`nrgProxy.get('${property}')\` is deprecated. Please use nrgProxy.${property} instead.`,
      false,
      {
        id: 'ember-nrg-ui.proxy.get',
        until: '5.0.0',
      }
    );

    return get(this.#target, property);
  }

  /**
   * Sets a property on the proxy.
   * @param {string} property
   * @param {any} value
   * @returns {any}
   * @deprecated Use `nrgProxy.<property> = <value>` instead.
   */
  set(property, value) {
    deprecate(
      `Setting a property via \`nrgProxy.set('${property}', ${value})\` is deprecated. Please use \`nrgProxy.${property} = ${value}\` instead.`,
      false,
      {
        id: 'ember-nrg-ui.proxy.set',
        until: '5.0.0',
      }
    );

    return set(this.#target, property, value);
  }

  /**
   * Gets the content of the proxy.
   * @returns {Object}
   * @deprecated Use `nrgProxy` instead.
   */
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

  /**
   * Sets the content of the proxy.
   * @param {Object} value
   * @returns {void}
   * @deprecated Use `nrgProxy.setTarget()` instead.
   */
  set content(value) {
    deprecate(
      `Setting \`nrgProxy.content\` is deprecated. Please use \`nrgProxy.setTarget()\` instead.`,
      false,
      {
        id: 'ember-nrg-ui.proxy.set-content',
        until: '5.0.0',
      }
    );

    this.#target = value;
  }

  /**
   * Sets the target of the proxy.
   * @param {Object} target
   * @returns {void}
   */
  setTarget(target) {
    this.#_target = target;
  }
}
