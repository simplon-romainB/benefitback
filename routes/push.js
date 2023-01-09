const webpush = require('web-push');

const vapidKeys = { // new
    publicKey: 'BHcuDDWF_B0YMZvR1Zp7-mipyFB4OcPSkG14RFW6tqLPJ8q4qe7ev7TSJliJi7pBKw1-0tqFqvP8s7J6BK49M_A', // new
    privateKey: 'WOkg-DwQGhNYUBUG_7vrH1ZTaOE_zpr2hx6ECmblcFM' // new
  };

  const subscription = {
    endpoint: '',
    expirationTime: null,
    keys: {
        auth: '',
        p256dh: '',
    },
};

const payload = {
    notification: {
        title: 'Title',
        body: 'This is my body',
        icon: 'assets/icons/icon-384x384.png',
        actions: [
            { action: 'bar', title: 'Focus last' },
            { action: 'baz', title: 'Navigate last' },
        ],
        data: {
            onActionClick: {
                default: { operation: 'openWindow' },
                bar: {
                    operation: 'focusLastFocusedOrOpen',
                    url: '/signin',
                },
                baz: {
                    operation: 'navigateLastFocusedOrOpen',
                    url: '/signin',
                },
            },
        },
    },
};

const options = {
    vapidDetails: {
        subject: 'mailto:example_email@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
    },
    TTL: 60,
};
webpush.sendNotification(subscription, JSON.stringify(payload), options)
    .then((_) => {
        console.log('SENT!!!');
        console.log(_);
    })
    .catch((_) => {
        console.log(_);
    });

