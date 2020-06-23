import { Meteor } from 'meteor/meteor';
import { Time } from '../time.js';

Meteor.publish('Time', function () {
    return Time.find();
});
