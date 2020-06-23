// Client entry point, imports all client code
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import '/imports/startup/client';
import '/imports/startup/both';

import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';   // here!
Vue.use(VueMeteorTracker);                           // here!

import App from '../imports/ui/components/vue/App.vue';

import './main.html';

// Meteor.startup(() => {
//     new Vue({
//         el: '#app',
//         ...App,
//     });
// });