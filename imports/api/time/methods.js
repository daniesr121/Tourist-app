// Methods related to Time

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Time } from './time.js';

Meteor.methods({
    'time.updateTime'() {
        console.log('calling update time method')
        return Time.upsert('currentTime', { $set: { time: new Date() } });
    },
});