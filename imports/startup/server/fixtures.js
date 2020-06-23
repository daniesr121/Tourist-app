// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { Time } from '../../api/time/time.js';


Meteor.startup(() => {
    // if the Links collection is empty
    if (Links.find().count() === 0) {
        const data = [
            {
                title: 'Do the Tutorial',
                url: 'https://www.meteor.com/try',
                createdAt: new Date(),
            },
            {
                title: 'Follow the Guide',
                url: 'http://guide.meteor.com',
                createdAt: new Date(),
            },
            {
                title: 'Read the Docs',
                url: 'https://docs.meteor.com',
                createdAt: new Date(),
            },
            {
                title: 'Discussions',
                url: 'https://forums.meteor.com',
                createdAt: new Date(),
            },
        ];

        data.forEach(link => Links.insert(link));
    }
    // Update the current time
    Meteor.call('time.updateTime');
    // Add a new doc on each start.
    Time.insert({ time: new Date() });
    // Print the current time from the database
    console.log(`The time is now ${Time.findOne().time}`);
});
