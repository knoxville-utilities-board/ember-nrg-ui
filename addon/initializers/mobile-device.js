export function initialize() {
  const iOS = /iP(ad|od|hone)/i.test(window.navigator.userAgent) && !window.MSStream;
  const android = window.navigator.userAgent.match(/Android/i);

  if (iOS) {
    document.querySelector('html').classList.add('ios-device');
  }
  if (android) {
    document.querySelector('html').classList.add('android-device');
  }
}

export default {
  initialize,
};
