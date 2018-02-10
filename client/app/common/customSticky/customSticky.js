// import angular from 'angular';
// import uiRouter from 'angular-ui-router';
// import customStickyComponent from './customSticky.component';

// let customStickyModule = angular.module('customSticky', [
//         uiRouter
//     ])
//     .directive("stickyNav", ['$window', function($window) {
//         function stickyNavLink(scope, element, $attrs) {

//             console.log($attrs.class);

//             var w = angular.element($window),
//                 // var w = angular.element(document.querySelector(".ltd-content")),
//                 size = element[0].clientHeight,
//                 stickyClass = $attrs.class.split(' ')[1].split('_')[1];
//             let top = 0;
//             let offset = $attrs.topoffset

//             let containerOffset;

//             let scrollTimeout = null;

//             function toggleStickyNav() {


//                 containerOffset = $window.pageYOffset ? $window.pageYOffset : (angular.element(document.querySelector(".ltd-content")).length ? angular.element(document.querySelector(".ltd-content"))[0].scrollTop : 0);

//                 if (!element.hasClass(stickyClass) && document.body.scrollTop > parseInt(offset)) {
//                     element.addClass(stickyClass);
//                 } else if (element.hasClass(stickyClass) && document.body.scrollTop <= parseInt(offset)) {
//                     element.removeClass(stickyClass);
//                 }





//                 if (scrollTimeout) clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(function() {
//                     if(document.body.scrollTop - offset >= 0 )
//                     document.getElementsByClassName($attrs.class.split(' ')[1])[0].style.top = document.body.scrollTop - offset + 'px';
//                 }, 1);


//                 // setTimeout(function(){

//                 // },300);
//                 // console.log(angular.element(document.querySelector(stickyClass)).css('top'));


//                 // if (!element.hasClass(stickyClass) && containerOffset > offset) {
//                 //     element.addClass(stickyClass);

//                 // } else if (element.hasClass(stickyClass) && containerOffset <= offset) {
//                 //     element.removeClass(stickyClass);
//                 //     element.css('top', 0 + 'px !important');
//                 // }
//             }
//             // scope.$watch(function() {
//             //     return element[0].getBoundingClientRect().top + containerOffset;
//             // }, function(newValue, oldValue) {
//             //     if (newValue !== oldValue && !element.hasClass(stickyClass)) {
//             //         top = newValue;
//             //     }
//             // });
//             // w.bind('resize', function stickyNavResize() {
//             //     element.removeClass(stickyClass);
//             //     top = element[0].getBoundingClientRect().top + containerOffset;
//             //     toggleStickyNav();
//             // });
//             w.bind('scroll', toggleStickyNav);
//         }

//         return {
//             scope: {},
//             restrict: 'A',
//             link: stickyNavLink
//         };
//     }])

// .component('customSticky', customStickyComponent)


// .name;

// export default customStickyModule;




























import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customStickyComponent from './customSticky.component';

let customStickyModule = angular.module('customSticky', [
        uiRouter
    ])
    .directive("stickyNav", ['$window', function($window) {
        function stickyNavLink(scope, element, $attrs) {

            console.log($attrs.class);


            // var w = angular.element($window),
                var w = angular.element(document.querySelector(".ltd-content")),
                size = element[0].clientHeight,
                stickyClass = $attrs.class.split(' ')[1].split('_')[1];
            let top = 0;
            var scrollTop;
            let offset = $attrs.topoffset

            let containerOffset;

            let scrollTimeout = null;

            function toggleStickyNav() {

                let scrollTop = angular.element(document.querySelector(".ltd-content"))[0].scrollTop;

                // containerOffset = $window.pageYOffset ? $window.pageYOffset : (angular.element(document.querySelector(".ltd-content")).length ? scrollTop : 0);

                if (!element.hasClass(stickyClass) && scrollTop > parseInt(offset)) {
                    element.addClass(stickyClass);
                } else if (element.hasClass(stickyClass) && scrollTop <= parseInt(offset)) {
                    element.removeClass(stickyClass);
                }

                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    if(scrollTop - offset >= 0 && scrollTop < document.getElementsByClassName("wrapper")[0].clientHeight)
                    document.getElementsByClassName($attrs.class.split(' ')[1])[0].style.top = scrollTop - offset + 'px';
                }, 1);


                // setTimeout(function(){

                // },300);
                // console.log(angular.element(document.querySelector(stickyClass)).css('top'));


                // if (!element.hasClass(stickyClass) && containerOffset > offset) {
                //     element.addClass(stickyClass);

                // } else if (element.hasClass(stickyClass) && containerOffset <= offset) {
                //     element.removeClass(stickyClass);
                //     element.css('top', 0 + 'px !important');
                // }
            }
            // scope.$watch(function() {
            //     return element[0].getBoundingClientRect().top + containerOffset;
            // }, function(newValue, oldValue) {
            //     if (newValue !== oldValue && !element.hasClass(stickyClass)) {
            //         top = newValue;
            //     }
            // });
            // w.bind('resize', function stickyNavResize() {
            //     element.removeClass(stickyClass);
            //     top = element[0].getBoundingClientRect().top + containerOffset;
            //     toggleStickyNav();
            // });
            w.bind('scroll', toggleStickyNav);
        }

        return {
            scope: {},
            restrict: 'A',
            link: stickyNavLink
        };
    }])

.component('customSticky', customStickyComponent)


.name;

export default customStickyModule;

