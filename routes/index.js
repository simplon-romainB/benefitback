var express = require('express');
var router = express.Router();
const webpush = require('web-push');

router.get('/',(req, res, next) =>{

const vapidKeys = { // new
    publicKey: 'BNzNoUKBPzr1FgZxVFbk__q8BdnICtjib4kWnouSkSxUcsiIN_O2uItaRJGlmh4iLJWoZmRdFDUgwAKq25WOK3A', // new
    privateKey: 'ifHu4FVHEnlQmQZUvySL6A2wqaKarnrDie6FXXyYbCo' // new
  };

const subscription = {
    endpoint:'https://192.168.99.42:8000',
    expirationTime: null,
    keys: {
        auth: 'ifHu4FVHEnlQmQZUvySL6A2wqaKarnrDie6FXXyYbCo',
        p256dh: 'BNzNoUKBPzr1FgZxVFbk__q8BdnICtjib4kWnouSkSxUcsiIN_O2uItaRJGlmh4iLJWoZmRdFDUgwAKq25WOK3A',
    },
};

const payload = {
    notification: {
        title: 'Title',
        body: 'This is my body',
        icon: '',
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
});


module.exports = router;
