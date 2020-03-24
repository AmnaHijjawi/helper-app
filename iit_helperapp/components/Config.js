var _Environments = {
  DEVELOPMENT: {
    DOMAIN: 'http://dev53.istanbulit.net/API/',
    CHAT_DOMAIN: 'http://dev53.istanbulit.net',
    PUSH_NOTES_DOMAIN: 'https://www.istanbulit.com',

    APP_NAME: 'IIT_HelperApp',
  },
  PRODUCTION: {
    DOMAIN: 'http://nashmi.istanbulit.net/API/',
    CHAT_DOMAIN: 'http://nashmi.istanbulit.net',
    PUSH_NOTES_DOMAIN: 'https://www.istanbulit.com',

    APP_NAME: 'IIT_HelperApp',
  },
};

// var Environment = _Environments['PRODUCTION'];
module.exports = _Environments['PRODUCTION'];
