import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';

export default class ViewComponentsNrgLightboxController extends Controller {
  @service
  application;

  @tracked
  counter = 0;

  @tracked
  photos = [
    {
      url: 'https://www.fillmurray.com/400/400',
      detail: 'Some details about the first photo\n',
    },
    {
      url: 'https://www.fillmurray.com/100/100',
      detail: 'Some details about the second photo\n',
    },
    {
      url: 'https://www.fillmurray.com/2448/3264',
      detail: 'Some details about the third photo\n',
    },
  ];

  constructor() {
    super(...arguments);
    this.incrementCounter();
  }

  async incrementCounter() {
    this.counter++;
    if (!this.application.testing) {
      await timeout(1000);
      this.incrementCounter();
    }
  }
}
