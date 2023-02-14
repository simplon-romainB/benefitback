var express = require('express');
var router = express.Router();
const webpush = require('web-push');



router.get('/',(req, res, next) =>{


    const vapidKeys = { // new
        publicKey: 'BNzNoUKBPzr1FgZxVFbk__q8BdnICtjib4kWnouSkSxUcsiIN_O2uItaRJGlmh4iLJWoZmRdFDUgwAKq25WOK3A', // new
        privateKey: 'ifHu4FVHEnlQmQZUvySL6A2wqaKarnrDie6FXXyYbCo' // new
      };
    
    const subscription = {
        endpoint:"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABjvqQuosRxHQ-OctA6xg7pmxatYhbE96cS99yIDcRAsM5JrZX6mwmecx_OfDwyi5uKi2tdFGA1EA3nu3kHa4S4h-dXdjSVIiTN2WoTegUw7ghplnCJ1Kf71jdR8BNXflzA10FcNlZqXvoS4lijYzbHknEk8IZfosQ8oVocQFHQ7NBc_WI",
        expirationTime: null,
        keys: {
            auth: 'y73UGnXHwB2U-xWEKf5Ezg',
            p256dh: 'BB0JbmewEYL4Y7M5NRALuGCNVgSMPTJa5FDfxQvQ2RCiO0fpSo6fPV42ry6MLDbUkj3rt8EU9lboDDWwFgy6kRg',
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
});

module.exports = router;
