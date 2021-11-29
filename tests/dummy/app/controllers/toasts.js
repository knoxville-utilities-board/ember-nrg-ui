import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ToastsController extends Controller {
  @service
  flashMessages;

  @action
  openDefaultToasts() {
    //BEGIN-SNIPPET default-toasts
    this.flashMessages.info('This is a default info message');
    this.flashMessages.success('This is a default success message');
    this.flashMessages.error('This is a default error message');
    //END-SNIPPET
  }

  @action
  openToastsWithoutProgress() {
    //BEGIN-SNIPPET no-progress-toasts
    this.flashMessages.info('This is a info message', {
      timeout: 3000,
      showProgress: false,
    });
    this.flashMessages.success('This is a success message', {
      timeout: 4000,
      showProgress: false,
    });
    this.flashMessages.error('This is an error message', {
      timeout: 5000,
      showProgress: false,
    });
    //END-SNIPPET
  }

  @action
  openProgressToast() {
    //BEGIN-SNIPPET progress-toasts
    this.flashMessages.info('This is a info message showing progress', {
      timeout: 3000,
    });
    this.flashMessages.success('This is a success message showing progress', {
      timeout: 4000,
    });
    this.flashMessages.error(
      'This is an really long running error message showing progress',
      {
        timeout: 100000,
      }
    );
    //END-SNIPPET
  }

  @action
  openStickyToast() {
    //BEGIN-SNIPPET sticky-toasts
    this.flashMessages.info('This is a sticky info message', {
      timeout: 0,
    });
    this.flashMessages.success('This is a sticky success message', {
      sticky: true,
    });
    this.flashMessages.error('This is a sticky error message', {
      sticky: true,
    });
    //END-SNIPPET
  }

  @action
  openToastWithLongMessage() {
    //BEGIN-SNIPPET long-toasts
    const message = `Bacon ipsum dolor amet beef kevin sausage fatback pork strip steak ribeye short loin ham hock biltong corned beef chicken pig short ribs prosciutto. Biltong turducken short ribs fatback pig tri-tip salami chuck capicola hamburger doner beef ribs chicken. Pork picanha ham hock shankle buffalo sausage kevin turducken spare ribs tongue ham kielbasa. Beef ribs sirloin bacon, turducken short ribs buffalo ground round pork loin swine. Drumstick frankfurter rump, alcatra kevin swine sirloin bacon.`;
    this.flashMessages.info(message);
    //END-SNIPPET
  }
}
