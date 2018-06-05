import {
  getKeyCode,
  getMouseCode
} from 'ember-keyboard';
import validModifiers from 'ember-keyboard/fixtures/modifiers-array';
import validMouseButtons from 'ember-keyboard/fixtures/mouse-buttons-array';
import getCmdKey from 'ember-keyboard/utils/get-cmd-key';
import {
  triggerEvent,
} from '@ember/test-helpers';

const keyEvent = function keyEvent(attributes, type, element) {
  const event = (attributes || '').split('+').reduce((event, attribute) => {
    if (validModifiers.indexOf(attribute) > -1) {
      attribute = attribute === 'cmd' ? getCmdKey() : attribute;
      event[`${attribute}Key`] = true;
    } else if (validMouseButtons.indexOf(attribute) > -1) {
      event.button = getMouseCode(attribute);
    } else {
      event.key = getKeyCode(attribute);
    }

    return event;
  }, {});
  return triggerEvent(element || document.body, type, event);
}

export const keyDown = function(attributes, element) {
  return keyEvent(attributes, 'keydown', element);
};

export const keyUp = function(attributes, element) {
  return keyEvent(attributes, 'keyup', element);
};

export const keyPress = function(attributes, element) {
  return keyEvent(attributes, 'keypress', element);
};

export const mouseDown = function(attributes, element) {
  return keyEvent(attributes, 'mousedown', element);
};

export const mouseUp = function(attributes, element) {
  return keyEvent(attributes, 'mouseup', element);
};

export const touchStart = function(attributes, element) {
  return keyEvent(attributes, 'touchstart', element);
};

export const touchEnd = function(attributes, element) {
  return keyEvent(attributes, 'touchend', element);
};
