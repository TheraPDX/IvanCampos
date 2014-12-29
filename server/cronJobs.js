    Meteor.startup(function () {
          SyncedCron.options = {
            log: false
          }

          SyncedCron.add({
            name: 'Get Wellington',
            schedule: function(parser) {
              return parser.text('every 20 seconds');
            },
            job: function() {
              Meteor.call('getWellington');
            }
          });

          SyncedCron.add({
            name: 'Get Chinatown',
            schedule: function(parser) {
              return parser.text('every 20 seconds');
            },
            job: function() {
              Meteor.call('getChinatown');
            }
          });

          SyncedCron.add({
            name: 'Get Downtown Crossing',
            schedule: function(parser) {
              return parser.text('every 20 seconds');
            },
            job: function() {
              Meteor.call('getDowntownCrossing');
            }
          });

          SyncedCron.add({
            name: 'Get Twitter',
            schedule: function(parser) {
              return parser.text('every 1 minute');
            },
            job: function() {
              Meteor.call('getTwitter');
            }
          });

          SyncedCron.add({
            name: 'Get BTC Price',
            schedule: function(parser) {
              return parser.text('every 1 minute');
            },
            job: function() {
              Meteor.call('getBtcPrice');
            }
          });

          SyncedCron.add({
            name: 'Get Altcoin Prices',
            schedule: function(parser) {
              return parser.text('every 5 minutes');
            },
            job: function() {
              Meteor.call('getAltcoinPrices');
            }
          });

          SyncedCron.add({
            name: 'Get Stocks',
            schedule: function(parser) {
              return parser.text('after 9:00 am before 5:00 pm every 30 seconds every weekday');
            },
            job: function() {
              Meteor.call('getStocks');
            }
          });

          SyncedCron.add({
            name: 'Get Techmeme',
            schedule: function(parser) {
              return parser.text('every 3 minutes');
            },
            job: function() {
              Meteor.call('getTechmeme');
            }
          });

          SyncedCron.add({
            name: 'Get Vice',
            schedule: function(parser) {
              return parser.text('every 5 minutes');
            },
            job: function() {
              Meteor.call('getVice');
            }
          });

          SyncedCron.add({
            name: 'Get CNN',
            schedule: function(parser) {
              return parser.text('every 5 minutes');
            },
            job: function() {
              Meteor.call('getCnn');
            }
          });

          SyncedCron.add({
            name: 'Get NYT',
            schedule: function(parser) {
              return parser.text('every 5 minutes');
            },
            job: function() {
              Meteor.call('getNyt');
            }
          });

          SyncedCron.add({
            name: 'Get Hacker News',
            schedule: function(parser) {
              return parser.text('every 5 minutes');
            },
            job: function() {
              Meteor.call('getHackerNews');
            }
          });

          SyncedCron.add({
            name: 'Get Reddit',
            schedule: function(parser) {
              return parser.text('every 2 minutes');
            },
            job: function() {
              Meteor.call('getReddit');
            }
          });

          SyncedCron.add({
            name: 'Get Stocktwits',
            schedule: function(parser) {
              return parser.text('every 15 minutes');
            },
            job: function() {
              Meteor.call('getStocktwits');
            }
          });

          SyncedCron.add({
            name: 'Get NBA',
            schedule: function(parser) {
              return parser.text('every 30 minutes after 6:00 pm every weekday');
            },
            job: function() {
              Meteor.call('getNba');
            }
          });

          SyncedCron.add({
            name: 'Get NBA',
            schedule: function(parser) {
              return parser.text('every 30 minutes after 1:00 pm every weekend');
            },
            job: function() {
              Meteor.call('getNba');
            }
          });

          SyncedCron.add({
            name: 'Get NFL Sunday',
            schedule: function(parser) {
              return parser.text('on Sunday every 2 minutes after 1:00 pm');
            },
            job: function() {
              Meteor.call('getNfl');
            }
          });

          SyncedCron.add({
            name: 'Get NFL Monday',
            schedule: function(parser) {
              return parser.text('on Monday every 2 minutes after 8:00 pm');
            },
            job: function() {
              Meteor.call('getNfl');
            }
          });

          SyncedCron.add({
            name: 'Get NFL Thursday',
            schedule: function(parser) {
              return parser.text('on Thursday every 2 minutes after 5:00 pm');
            },
            job: function() {
              Meteor.call('getNfl');
            }
          });


          SyncedCron.add({
            name: 'Get Weather',
            schedule: function(parser) {
              return parser.text('every 15 minutes');
            },
            job: function() {
              Meteor.call('getWeather');
            }
          });

          SyncedCron.add({
            name: 'Get Activity',
            schedule: function(parser) {
              return parser.text('every 12 hours');
            },
            job: function() {
              Meteor.call('getActivity');
            }
          });

          SyncedCron.add({
            name: 'Get Automatic',
            schedule: function(parser) {
              return parser.text('every 4 hours');
            },
            job: function() {
              Meteor.call('getAutomatic');
            }
          });

          SyncedCron.add({
            name: 'Get BMI',
            schedule: function(parser) {
              return parser.text('every 12 hours');
            },
            job: function() {
              Meteor.call('getBmi');
            }
          });


          SyncedCron.start();
   });
