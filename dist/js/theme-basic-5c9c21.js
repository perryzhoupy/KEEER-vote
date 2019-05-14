!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){},function(e,t,n){"use strict";var r,i="object"==typeof Reflect?Reflect:null,o=i&&"function"==typeof i.apply?i.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};r=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var u=10;function l(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function c(e,t,n,r){var i,o,s,a;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=l(e))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,a=u,console&&console.warn&&console.warn(a)}return e}function p(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,o(this.listener,this.target,e))}.bind(r);return i.listener=n,r.wrapFn=i,i}function v(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):f(i,i.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");u=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return l(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)o(u,this,t);else{var l=u.length,c=f(u,l);for(n=0;n<l;++n)o(c[n],this,t)}return!0},a.prototype.addListener=function(e,t){return c(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return c(this,e,t,!0)},a.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,p(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,p(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,r,i,o,s;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},a.prototype.listeners=function(e){return v(this,e,!0)},a.prototype.rawListeners=function(e){return v(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},a.prototype.listenerCount=d,a.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},function(e,t,n){"use strict";e.exports=n(4)},function(e,t,n){"use strict";var r=n(0);n.n(r).a},function(e,t,n){"use strict";const r={$id(e=""){return`${this.uid}-${e}`},$idRef(e){return`#${this.$id(e)}`}};e.exports=function(e){let t=0;e.mixin({beforeCreate(){const e=`uid-${t+=1}`;Object.defineProperties(this,{uid:{get:()=>e}})}}),Object.assign(e.prototype,r)}},function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"VRadio",function(){return d}),n.d(r,"VCheckbox",function(){return y}),n.d(r,"VText",function(){return x}),n.d(r,"VTextarea",function(){return $});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vote-main"},[e.nodata?n("h1",[e._v(e._s(e.nodataTip))]):n("Form",{attrs:{title:e.data.title,action:e.data.action,method:e.data.method}},e._l(e.data.data,function(t,r){return n("Page",{key:r},e._l(t,function(e){return n("Question",{key:e.id,attrs:{id:e.id,type:e.type,value:e.value,data:e}})}),1)}),1)],1)};i._withStripped=!0;var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",[n("h1",[e._v(e._s(this.title))]),e._v(" "),e.submitting||e.submitted?e._e():e._t("default"),e._v(" "),e.submitting||e.submitted?e._e():n("span",{staticClass:"form-controls"},[e._v("\n    "+e._s(e.texts.pageno)+"\n    "),n("button",{staticClass:"form-prev",attrs:{hidden:!e.prevVisible},on:{click:e.prev}},[e._v(e._s(e.texts.prevPage))]),e._v(" "),n("button",{staticClass:"form-next",attrs:{hidden:!e.nextVisible},on:{click:e.next}},[e._v(e._s(e.texts.nextPage))]),e._v(" "),n("button",{staticClass:"form-submit",attrs:{hidden:e.nextVisible},on:{click:e.submit}},[e._v(e._s(e.texts.submit))])]),e._v(" "),e.submitting&&!e.submitted?n("h1",[e._v(e._s(e.texts.submitting))]):e._e(),e._v(" "),e.submitted?n("h1",[e._v(e._s(e.texts.submitted))]):e._e()],2)};o._withStripped=!0;var s=function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.type,{ref:"realQuestion",tag:"component",attrs:{data:e.data,value:e.value},on:{"update:value":function(t){e.value=t}}},[e._t("default")],2)};s._withStripped=!0;var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v(e._s(e.data.title))]),e._v(" "),e._l(e.data.options,function(t){return n("span",{key:t.value},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value_,expression:"value_"}],attrs:{type:"radio",id:e.$id(t.value)},domProps:{value:t.value,checked:e._q(e.value_,t.value)},on:{change:function(n){e.value_=t.value}}}),e._v(" "),n("label",{attrs:{for:e.$id(t.value)}},[e._v(e._s(t.label))])])})],2)};a._withStripped=!0;var u=n(1),l=new(n.n(u).a),c={data(){return{value_:this.value,old:null}},methods:{syncOld(){this.old=this.value_}},watch:{value_(e){this.$emit("update:value",e),l.emit("question:update",this,e,this.old),this.syncOld()},value(e){this.value_=e}},mounted(){this.syncOld()},computed:{overridesParent(){return!!this.question_},question(){return this.question_||this.$parent},realQuestion(){return this.question.$children[0]}}};function p(e,t,n,r,i,o,s,a){var u,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=u):i&&(u=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),u)if(l.functional){l._injectStyles=u;var c=l.render;l.render=function(e,t){return u.call(t),c(e,t)}}else{var p=l.beforeCreate;l.beforeCreate=p?[].concat(p,u):[u]}return{exports:e,options:l}}var v=p({name:"VRadio",mixins:[c],props:{data:{type:Object,validator:e=>e.title&&e.options&&e.options.every(e=>e.label&&e.value)},value:String}},a,[],!1,null,null,null);v.options.__file="src/themes/basic/types/VRadio.vue";var d=v.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v(e._s(e.data.title))]),e._v(" "),e._l(e.data.options,function(t){return n("VCheckboxInput",{key:t.value,attrs:{option:t,value:e.value_[t.value]},on:{"update:value":function(n){return e.$set(e.value_,t.value,n)}}})})],2)};f._withStripped=!0;var h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value_,expression:"value_"}],attrs:{type:"checkbox",id:e.uid},domProps:{value:e.option.value,checked:Array.isArray(e.value_)?e._i(e.value_,e.option.value)>-1:e.value_},on:{change:function(t){var n=e.value_,r=t.target,i=!!r.checked;if(Array.isArray(n)){var o=e.option.value,s=e._i(n,o);r.checked?s<0&&(e.value_=n.concat([o])):s>-1&&(e.value_=n.slice(0,s).concat(n.slice(s+1)))}else e.value_=i}}}),e._v(" "),n("label",{attrs:{for:e.uid}},[e._v(e._s(e.option.label))])])};h._withStripped=!0;var m=p({name:"VCheckboxInput",mixins:[c],data(){return{question_:this.$parent.$parent}},props:{option:Object,value:Boolean}},h,[],!1,null,null,null);m.options.__file="src/themes/basic/types/VCheckboxInput.vue";var _=p({name:"VCheckbox",data(){return{value_:this.value}},components:{VCheckboxInput:m.exports},props:{data:{type:Object,validator:e=>e.title&&e.options&&e.options.every(e=>e.label&&e.value)},value:Object}},f,[],!1,null,null,null);_.options.__file="src/themes/basic/types/VCheckbox.vue";var y=_.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v(e._s(e.data.title))]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.value_,expression:"value_"}],domProps:{value:e.value_},on:{input:function(t){t.target.composing||(e.value_=t.target.value)}}})])};b._withStripped=!0;var g=p({name:"VText",mixins:[c],props:{data:{type:Object,validator:e=>e.title},value:String}},b,[],!1,null,null,null);g.options.__file="src/themes/basic/types/VText.vue";var x=g.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v(e._s(e.data.title))]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.value_,expression:"value_"}],domProps:{value:e.value_},on:{input:function(t){t.target.composing||(e.value_=t.target.value)}}})])};w._withStripped=!0;var O=p({name:"VTextarea",mixins:[c],props:{data:{type:Object,validator:e=>e.title},value:String}},w,[],!1,null,null,null);O.options.__file="src/themes/basic/types/VTextarea.vue";var $=O.exports;const L={};for(let e in r)L[e]=r[e];var C=p({name:"Question",data(){return{value:this.$attrs.value}},components:L,props:{type:{type:String,validator:e=>e in r},data:Object,id:Number},computed:{},provide(){return{Question:this}}},s,[],!1,null,null,null);C.options.__file="src/themes/basic/Question.vue";var V=C.exports,j=function(){var e=this.$createElement;return(this._self._c||e)("div",{class:this.current?"page current":"page"},[this._t("default")],2)};j._withStripped=!0;var P={name:"Page",data:()=>({current:!1}),computed:{questions(){return this.$children}}},E=(n(3),p(P,j,[],!1,null,null,null));E.options.__file="src/themes/basic/Page.vue";var S=E.exports;Array.prototype.flat||Object.defineProperty(Array.prototype,"flat",{configurable:!0,value:function e(){var t=isNaN(arguments[0])?1:Number(arguments[0]);return t?Array.prototype.reduce.call(this,function(n,r){return Array.isArray(r)?n.push.apply(n,e.call(r,t-1)):n.push(r),n},[]):Array.prototype.slice.call(this)},writable:!0}),Array.prototype.flatMap||Object.defineProperty(Array.prototype,"flatMap",{configurable:!0,value:function(e){return Array.prototype.map.apply(this,arguments).flat()},writable:!0});var T=p(Vue.extend({data:function(){return{current:0,prevVisible:!1,nextVisible:!1,status:"filling"}},props:{title:String,action:String,method:String},methods:{prev(){0!==this.current&&(this.$children[this.current].current=!1,this.current--,this.$children[this.current].current=!0,this.update())},next(){this.current!==this.pages.length-1&&(this.$children[this.current].current=!1,this.current++,this.$children[this.current].current=!0,this.update())},update(){this.updateVisibility(),l.emit("form:update",this)},updateVisibility(){0===this.current?this.prevVisible=!1:this.prevVisible=!0,this.current===this.pages.length-1?this.nextVisible=!1:this.nextVisible=!0},submit(){let e=!1;l.emit("form:beforesubmit",this,()=>e=!0),e||l.emit("form:submit",this)}},components:{Question:V,Page:S},mounted(){this.$children[this.current].current=!0,this.updateVisibility(),l.emit("form:mounted",this)},computed:{pages(){return this.$children},texts(){let e={prevPage:"←Prev page",nextPage:"Next page→",submit:"Submit",pageno:`Page ${this.current+1}`,submitting:"Submitting...",submitted:"The form has been submitted. Thank you."};return l.emit("form:texts",this,t=>e=Object.assign(e,t)),e},currentPage(){let e=this.current+1;return l.emit("form:pageno",this,t=>e=t),e},submitted(){return"submitted"===this.status},submitting(){return"submitting"===this.status},formdata(){const e=[];return this.pages.flatMap(e=>e.questions).forEach(t=>{e[t.id]=t.value}),e}}}),o,[],!1,null,null,null);T.options.__file="src/themes/basic/Form.vue";var k=p({components:{Form:T.exports,Question:V,Page:S},data:()=>({nodata:!("KVoteFormData"in window),data:window.KVoteFormData}),computed:{nodataTip(){let e="No form data supplied. This is usually an error in the URL.";return l.emit("app:nodata",this,t=>e=t),e}}},i,[],!1,null,null,null);k.options.__file="src/themes/basic/App.vue";var R=k.exports,A=n(2),N=n.n(A);window.voteHooks=l,window.dispatchEvent(new Event("vote:ready"));const F=document.createElement("div");F.id="app",document.body.appendChild(F),Vue.use(N.a),window.vm=new Vue({el:"#app",render:e=>e(R)})}]);
//# sourceMappingURL=theme-basic-5c9c21.js.map