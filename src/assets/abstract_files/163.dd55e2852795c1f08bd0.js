/*! For license information please see 163.dd55e2852795c1f08bd0.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[163],{1057:function(t,e,r){"use strict";r.r(e);var n=r(8),o=r.n(n),i=r(11);function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return(e=g(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function u(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"===typeof t)return l(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function h(){h=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(j){c=function(t,e,r){return t[e]=r}}function u(t,e,r,o){var i=e&&e.prototype instanceof d?e:d,a=Object.create(i.prototype),s=new _(o||[]);return n(a,"_invoke",{value:P(t,r,s)}),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(j){return{type:"throw",arg:j}}}t.wrap=u;var f={};function d(){}function p(){}function g(){}var b={};c(b,i,(function(){return this}));var v=Object.getPrototypeOf,y=v&&v(v(S([])));y&&y!==e&&r.call(y,i)&&(b=y);var m=g.prototype=d.prototype=Object.create(b);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){var o;n(this,"_invoke",{value:function(n,i){function a(){return new e((function(o,a){!function n(o,i,a,s){var c=l(t[o],t,i);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,a,s)}),(function(t){n("throw",t,a,s)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return n("throw",t,a,s)}))}s(c.arg)}(n,i,o,a)}))}return o=o?o.then(a,a):a()}})}function P(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return L()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=E(a,r);if(s){if(s===f)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=l(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function E(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function S(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return p.prototype=g,n(m,"constructor",{value:g,configurable:!0}),n(g,"constructor",{value:p,configurable:!0}),p.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},w(O.prototype),c(O.prototype,a,(function(){return this})),t.AsyncIterator=O,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new O(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(m),c(m,s,"Generator"),c(m,i,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=S,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function f(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function d(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){f(i,n,o,a,s,"next",t)}function s(t){f(i,n,o,a,s,"throw",t)}a(void 0)}))}}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,g(n.key),n)}}function g(t){var e=function(t,e){if("object"!==typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===typeof e?e:String(e)}var b=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,n,a,c,l;return e=t,(r=[{key:"initialize",value:(l=d(h().mark((function t(e){var r,n,o,i,a,s,c,u;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.collection,n=e.perPage,o=e.placement,i=e.params,a=e.numberOfAdsOnFirstPage,s=e.numberOfAdsOnSubsequentPages,c=e.adGroupPositions,u=[r,n,o,a,s,c],this.collection=u[0],this.perPage=u[1],this.placement=u[2],this.numberOfAdsOnFirstPage=u[3],this.numberOfAdsOnSubsequentPages=u[4],this.adGroupPositions=u[5],this.setCurrentPageElements(),this.cachedItems=[],this.params=i||{},this.servedShotIds=[],this.currentPage=1,this.hasMoreThanOnePageOfShots=this.collection.length>=this.perPage,this.onScrollFunction=this.onScroll.bind(this),this.boostsOnPage={},this.collection.filter((function(t){return t instanceof Element||t instanceof HTMLDocument})),!(this.collection.length<=1)){t.next=19;break}return t.abrupt("return");case 19:return t.next=21,this.injectCurrentPage();case 21:this.bindEventListeners();case 22:case"end":return t.stop()}}),t,this)}))),function(t){return l.apply(this,arguments)})},{key:"bindEventListeners",value:function(){var t=this,e=function(){var e=Dribbble.Thumbnails.thumbnailsArray();e.length<=1||t.setAndInjectNewPage(e)};document.addEventListener("dribbble.infinitescroll.append",e),document.addEventListener("dribbble.filterShotResults",(function(){t.boostsOnPage={},e()})),Dribbble.EventBus.$on("shotFilters:updatedLocation",(function(e){var r=e.category,n=e.tag;t.params.category=r,t.params.tag=n}))}},{key:"setCurrentPageElements",value:function(){this.currentPageElements=this.collection.length==this.perPage?this.collection:this.collection.slice(-this.perPage)}},{key:"setAndInjectNewPage",value:function(t){this.currentPage++,this.collection=t,this.setCurrentPageElements(),this.addCachedItem(),this.injectCurrentPage()}},{key:"injectCurrentPage",value:(c=d(h().mark((function t(){var e,r=this;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.fetchBoosts();case 2:e=t.sent,this.hasMoreThanOnePageOfShots&&this.cacheExtraItems(),e.forEach((function(t){if(!t.boostPartial)return r.collection;var e;(e=r.hasMoreThanOnePageOfShots?r.currentPageElements[t.boostIndex-1]:r.collection[t.boostIndex])&&(e.insertAdjacentHTML("afterend",t.boostPartial),Dribbble.EventBus.$emit("boostedShotsAd:initialize"),r.bindBoostedAdEvents(t.boostId,t.trackingData,t.itlyTrackingData))}));case 5:case"end":return t.stop()}}),t,this)}))),function(){return c.apply(this,arguments)})},{key:"addCachedItem",value:function(){for(var t=0;t<this.getNumberOfBoosts();t++)this.cachedItems.length&&(this.currentPageElements[0].insertAdjacentElement("beforebegin",this.cachedItems[0]),this.cachedItems.shift())}},{key:"cacheExtraItems",value:function(){var t=1===this.currentPage?this.getNumberOfBoosts():2*this.getNumberOfBoosts(),e=this.collection.slice(this.collection.length-t,this.collection.length);this.cachedItems=[].concat(u(this.cachedItems),u(e)),e.forEach((function(t){return t.remove()}))}},{key:"getNewBoostIndex",value:function(t,e){var r=this.currentPageElements.length/t,n=r*e-r,o=n<2?2:n,i=r*e;return Math.floor(Math.random()*(i-o)+o)}},{key:"getNumberOfBoosts",value:function(){return this.collection.length<this.perPage?1:1===this.currentPage?this.numberOfAdsOnFirstPage:this.numberOfAdsOnSubsequentPages}},{key:"fetchBoosts",value:(a=d(h().mark((function t(){var e,r,n,i,a,c=this;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=[],r=[],this.params.q&&(this.params.keyword=this.params.q,delete this.params.q),n={placement:this.placement,provider:"Dribbble",pagePosition:null,searchRequest:JSON.stringify(this.params)},i={placement:this.placement,provider:"Dribbble",unit_type:"Boosted Shots"},a=0;a<this.getNumberOfBoosts();a++)r.push(Dribbble.uuidv4());return r.forEach((function(t){i.impression_id=t,Dribbble.Itly.adRequested(i)})),t.next=9,o.a.get("/screenshot_boost?render_in_list=true",{params:{original_params:this.params,served_shot_ids:this.servedShotIds,request_source:this.placement,number_of_boosts:this.getNumberOfBoosts(),current_page:this.currentPage}}).then((function(t){t.data.data.forEach((function(t,o){var a,u=t.searchData,l=t.viewData;a=c.hasMoreThanOnePageOfShots?c.getNewBoostIndex(8,c.adGroupPositions[o]):c.collection.length-1,c.servedShotIds.push(u.screenshotId);var h,f=s(s({},n),{},{requestId:r[o],pagePosition:a,adData:{ad_id:u.adId,ad_link:u.adLink,ad_link_type:u.adLinkType,ad_text:u.adText,has_pixel_tracking:u.has_pixel_tracking}});switch(u.adLinkType){case"shot-page":h="Shot";break;case"profile":h="Profile";break;case"custom":default:h="Custom URL"}var d=s(s({},i),{},{impression_id:r[o],ad_id:u.adId.toString(),ad_link:u.adLink,ad_link_type:h,ad_text:u.adText||"",has_cta:!1});Dribbble.Itly.adServed(d),e.push({trackingData:f,itlyTrackingData:d,boostIndex:a,boostId:u.adId,boostPartial:l})}))})).catch((function(){Dribbble.Itly.adRequestFailed(s(s({},i),{},{reason:"No boosted shots available."}))}));case 9:return t.abrupt("return",e);case 10:case"end":return t.stop()}}),t,this)}))),function(){return a.apply(this,arguments)})},{key:"onScroll",value:function(){var t=this;Object.keys(this.boostsOnPage).forEach((function(e){t.boostsOnPage[e].adElement.getBoundingClientRect().bottom<=window.innerHeight&&!t.boostsOnPage[e].hasBeenScrolledIntoView&&(t.boostsOnPage[e].hasBeenScrolledIntoView=!0,Dribbble.Itly.adImpressionViewed(t.boostsOnPage[e].itlyTrackingData))}))}},{key:"bindBoostedAdEvents",value:function(t,e,r){var n=this;this.boostsOnPage[t]||(this.boostsOnPage[t]={trackingData:e,itlyTrackingData:r,hasBeenScrolledIntoView:!1,adElement:document.querySelector('.js-ad-boosted[data-boost-id="'.concat(t,'"]'))}),this.boostsOnPage[t]&&this.boostsOnPage[t].adElement&&this.boostsOnPage[t].adElement.addEventListener("click",(function(){Dribbble.Itly.adClicked(n.boostsOnPage[t].itlyTrackingData),o.a.get("/screenshot_boost/click",{params:{id:t,request_source:n.boostsOnPage[t].adElement.dataset.requestSource}},Object(i.axiosOptions)())})),window.removeEventListener("scroll",this.onScrollFunction),window.addEventListener("scroll",this.onScrollFunction)}}])&&p(e.prototype,r),n&&p(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();e.default=new b}}]);
//# sourceMappingURL=163.dd55e2852795c1f08bd0.js.map