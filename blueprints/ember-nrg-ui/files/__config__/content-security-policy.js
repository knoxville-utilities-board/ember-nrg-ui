module.exports = function () {
    return {
      delivery: ['header'],
      enabled: true,
      failTests: true,
      policy: {
        'default-src': ["'none'"],
        'connect-src': ["'self'"],
        'script-src': ["'self' 'unsafe-eval'"],
        'script-src-elem': ["'self' 'unsafe-inline'",],
        'img-src': ["'self'"],
        'font-src': ["'self' data:"],
        'style-src': ["'unsafe-inline'"],
        'style-src-elem': ["'self'"],
        'report-uri': ['/'],
      },
      reportOnly: true,
    };
  };