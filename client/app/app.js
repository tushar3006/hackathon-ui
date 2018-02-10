import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-material';
// import StringConstants from './common/stringConstants';
import AppConstants from './common/appConstants';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'angular-material/angular-material.css';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';


// offlinePlugin.install();

let app = angular.module('app', [
    uiRouter,
    'ui.bootstrap',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    Common,
    Components

])


.constant('AppConstants', AppConstants)
.constant('STRINGS', '')
.constant('BrandData', '')
    // .config(($locationProvider) => {
    //     'ngInject';
    //     // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    //     // #how-to-configure-your-server-to-work-with-html5mode
    //     $locationProvider.htmapmenul5Mode(true).hashPrefix('!');
    // })

.component('app', AppComponent);






/* eslint no-console: "off" */
console.log('If looking under the hood is your thing, we\'d love to chat http://limetray.com/careers ');
