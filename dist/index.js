(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Phaser3GamepadPlugin", [], factory);
	else if(typeof exports === 'object')
		exports["Phaser3GamepadPlugin"] = factory();
	else
		root["Phaser3GamepadPlugin"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Exocraft (https://exocraft.io)
 * Copyright (c) 2017 - 2018, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

const GamePadManager = __webpack_require__(1);

/**
 * @class GamepadPlugin
 * @memberOf Phaser.Input
 */
class GamepadPlugin {
  /**
   * Setup the gamepad plugin.
   * @param {Phaser.Scene} scene The scene the plugin is attached to.
   */
  constructor(scene) {
    this.scene = scene;
    this.systems = scene.sys;
    this.config = this.getConfig();

    scene.sys.events.once('boot', this.boot, this);
    scene.sys.events.on('start', this.start, this);

    this.gamepads = new GamePadManager();
  }

  /**
   * This method is called automatically, only once, when the Scene is first created.
   * Do not invoke it directly.
   */
  boot() {
    this.systems.events.once('destroy', this.destroy, this);
  }

  /**
   * This method is called automatically by the Scene when it is starting up.
   * It is responsible for creating local systems, properties and listening for Scene events.
   * Do not invoke it directly.
   */
  start() {
    const eventEmitter = this.systems.events;

    eventEmitter.on('update', this.gamepads.update, this.gamepads);
    eventEmitter.once('shutdown', this.shutdown, this);
  }

  /**
   * Get the configuration for this system.
   */
  getConfig() {
    const gameConfig = this.systems.game.config.input || {};
    const sceneConfig = this.systems.settings.input || {};

    return Object.assign({}, sceneConfig.gamepadPlugin || {}, gameConfig.gamepadPlugin || {});
  }

  /**
   * Handle scene/game pause.
  */
  pause() {
    const eventEmitter = this.systems.events;
    eventEmitter.off('update', this.gamepads.update, this.gamepads);
  }

  /**
   * Handle scene/game resume.
  */
  resume() {
    const eventEmitter = this.systems.events;
    eventEmitter.on('update', this.gamepads.update, this.gamepads);
  }

  /**
   * The Scene that owns this plugin is shutting down.
   * We need to kill and reset all internal properties as well as stop listening to Scene events.
   */
  shutdown() {
    const eventEmitter = this.systems.events;

    eventEmitter.off('update', this.gamepads.update, this.gamepads);
    eventEmitter.off('shutdown', this.shutdown, this);
  }

  /**
   * The Scene that owns this plugin is being destroyed.
   * We need to shutdown and then kill off all external references.
   */
  destroy() {
    this.shutdown();

    this.scene.sys.events.off('start', this.start, this);

    this.scene = null;
    this.systems = null;
    this.config = null;
    this.gamepads = null;
  }
}

module.exports = GamepadPlugin;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.gamepadEvents=e():t.gamepadEvents=e()}(window,function(){return function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){const s=n(2);t.exports=class extends s{constructor(t={}){super(),this.states={},this.buttonThreshold=t.buttonThreshold||.1,this.axisThreshold=t.axisThreshold||.1,this.longpressThreshold=t.longpressThreshold||300,this.repeatThreshold=t.repeatThreshold||300,this.repeatRate=t.repeatRate||100,this.delta={0:{},1:{},2:{},3:{}},this.longpress={0:{},1:{},2:{},3:{}},this.repeat={0:{},1:{},2:{},3:{}},this._setupButtonMappings();for(let t=0;t<4;t+=1){const e=navigator.getGamepads()[t];e&&this._setState(e)}}_setupButtonMappings(){this.mappings={ps4_x:{type:"button",index:0},ps4_circle:{type:"button",index:1},ps4_square:{type:"button",index:2},ps4_triangle:{type:"button",index:3},ps4_l1:{type:"button",index:4},ps4_r1:{type:"button",index:5},ps4_l2:{type:"button",index:6},ps4_r2:{type:"button",index:7},ps4_share:{type:"button",index:8},ps4_options:{type:"button",index:9},ps4_left_stick_in:{type:"button",index:10},ps4_right_stick_in:{type:"button",index:11},ps4_dpad_up:{type:"button",index:12},ps4_dpad_down:{type:"button",index:13},ps4_dpad_left:{type:"button",index:14},ps4_dpad_right:{type:"button",index:15},ps4_ps:{type:"button",index:16},ps4_left_stick_x:{type:"axis",index:0},ps4_left_stick_y:{type:"axis",index:1},ps4_right_stick_x:{type:"axis",index:2},ps4_right_stick_y:{type:"axis",index:3},xbox_a:{type:"button",index:0},xbox_b:{type:"button",index:1},xbox_x:{type:"button",index:2},xbox_y:{type:"button",index:3},xbox_lb:{type:"button",index:4},xbox_rb:{type:"button",index:5},xbox_lt:{type:"button",index:6},xbox_rt:{type:"button",index:7},xbox_back:{type:"button",index:8},xbox_start:{type:"button",index:9},xbox_left_stick_in:{type:"button",index:10},xbox_right_stick_in:{type:"button",index:11},xbox_dpad_up:{type:"button",index:12},xbox_dpad_down:{type:"button",index:13},xbox_dpad_left:{type:"button",index:14},xbox_dpad_right:{type:"button",index:15},xbox_left_stick_x:{type:"axis",index:0},xbox_left_stick_y:{type:"axis",index:1},xbox_right_stick_x:{type:"axis",index:2},xbox_right_stick_y:{type:"axis",index:3},rc_bottom:{type:"button",index:0},rc_right:{type:"button",index:1},rc_left:{type:"button",index:2},rc_top:{type:"button",index:3},l1:{type:"button",index:4},r1:{type:"button",index:5},l2:{type:"button",index:6},r2:{type:"button",index:7},center_left:{type:"button",index:8},center_right:{type:"button",index:9},left_stick_in:{type:"button",index:10},right_stick_in:{type:"button",index:11},dpad_up:{type:"button",index:12},dpad_down:{type:"button",index:13},dpad_left:{type:"button",index:14},dpad_right:{type:"button",index:15},center_center:{type:"button",index:16},left_stick_x:{type:"axis",index:0},left_stick_y:{type:"axis",index:1},right_stick_x:{type:"axis",index:2},right_stick_y:{type:"axis",index:3}}}_startHold(t,e){this.longpress[t][e]||(this.longpress[t][e]={start:Date.now(),fired:!1}),this.repeat[t][e]||(this.repeat[t][e]={start:Date.now(),fired:!1})}_clearHold(t,e){delete this.longpress[t][e],delete this.repeat[t][e]}_onButtonEvent(t,e,n,s){const i=`button_${n}`;switch(this.emit(t,{player:e,button:i,value:s}),this.emit(`${t}:${i}`,{player:e,button:i,value:s}),t){case"down":this.delta[e][i]=!0;break;case"hold":delete this.delta[e][i],this._startHold(e,i);break;case"up":this.delta[e][i]=!1,this._clearHold(e,i);break;case"longpress":this.longpress[e][i].fired=!0;break;case"repeat":this.repeat[e][i].fired=!0,this.repeat[e][i].start=Date.now()}}_onAxisEvent(t,e,n,s){const i=`axis_${n}`;switch(this.emit(t,{player:e,axis:i,value:s}),this.emit(`${t}:${i}`,{player:e,axis:i,value:s}),t){case"down":case"hold":this._startHold(e,i),this.delta[e][i]=s;break;case"up":this.delta[e][i]=0,this._clearHold(e,i);break;case"longpress":this.longpress[e][i].fired=!0;break;case"repeat":this.repeat[e][i].fired=!0,this.repeat[e][i].start=Date.now()}}_setState(t){this.states[t.index]=this.states[t.index]||{},this.states[t.index].axes=t.axes.map(t=>t),this.states[t.index].buttons=t.buttons.map(t=>t.value)}_updateButtons(t,e,n){const s=e.buttons[n].value,i=this.states[t].buttons[n];if(s>this.buttonThreshold&&i<=this.buttonThreshold&&this._onButtonEvent("down",t,n,s),s>this.buttonThreshold&&i>this.buttonThreshold){this._onButtonEvent("hold",t,n,s);const e=`button_${n}`,i=this.longpress[t][e];i&&Date.now()-i.start>this.longpressThreshold&&!i.fired&&this._onButtonEvent("longpress",t,n,s);const o=this.repeat[t][e],r=o&&!o.fired&&Date.now()-o.start>this.repeatThreshold,a=o&&o.fired&&Date.now()-o.start>this.repeatRate;(r||a)&&this._onButtonEvent("repeat",t,n,s)}s<=this.buttonThreshold&&i>this.buttonThreshold&&this._onButtonEvent("up",t,n,s),s<=this.buttonThreshold&&i<=this.buttonThreshold&&delete this.delta[t][`button_${n}`]}_updateAxes(t,e,n){const s=e.axes[n],i=this.states[t].axes[n],o=Math.abs(s)>=this.axisThreshold,r=Math.abs(i)>=this.axisThreshold;if(o)if(r){this._onAxisEvent("hold",t,n,s);const e=`axis_${n}`,i=this.longpress[t][e];i&&Date.now()-i.start>this.longpressThreshold&&!i.fired&&this._onAxisEvent("longpress",t,n,s);const o=this.repeat[t][e],r=o&&!o.fired&&Date.now()-o.start>this.repeatThreshold,a=o&&o.fired&&Date.now()-o.start>this.repeatRate;(r||a)&&this._onAxisEvent("repeat",t,n,s)}else this._onAxisEvent("down",t,n,s);else r&&this._onAxisEvent("up",t,n,s);0===this.delta[t][`axis_${n}`]&&delete this.delta[t][`axis_${n}`]}update(){const t=navigator.getGamepads();for(let e=0;e<4;e+=1){const n=t[e];if(n&&n.connected)if(this.states[e]){for(let t=0;t<n.buttons.length;t+=1)this._updateButtons(e,n,t);for(let t=0;t<n.axes.length;t+=1)this._updateAxes(e,n,t);this._setState(n)}else this._setState(n)}}isDown(t,e=-1){let n;return this.mappings[t]&&(n=this.mappings[t]),n?"button"===n.type?this._isButtonDown(n.index,e):this._isAxisDown(n.index,e):0}_isButtonDown(t,e){if(-1!==e&&this.states[e]&&this.states[e].buttons.length&&this.states[e].buttons[t]>=this.buttonThreshold)return this.states[e].buttons[t];for(let e=0;e<4;e+=1)if(this.states[e]&&this.states[e].buttons.length&&this.states[e].buttons[t]>=this.buttonThreshold)return this.states[e].buttons[t];return 0}_isAxisDown(t,e){if(-1!==e&&this.states[e]&&this.states[e].axes.length&&Math.abs(this.states[e].axes[t])>this.axisThreshold)return this.states[e].axes[t];for(let e=0;e<4;e+=1)if(this.states[e]&&this.states[e].axes.length&&Math.abs(this.states[e].axes[t])>this.axisThreshold)return this.states[e].axes[t];return 0}getStick(t,e=-1){return{x:this.isDown(`${t}_x`,e),y:this.isDown(`${t}_y`,e)}}on(t,...e){if(t.includes(":")){let[n,s]=t.split(":");if(this.mappings[s]){const t=this.mappings[s];s=t.type+"_"+t.index}return super.on(n+":"+s,...e)}return super.on(t,...e)}off(t,...e){if(t.includes(":")){const n=t.split(":")[0];let s=t.split(":")[1];if(this.mappings[s]){const t=this.mappings[s];s=t.type+"_"+t.value}return super.off(n+":"+s,...e)}return super.off(t,...e)}}},function(t,e,n){"use strict";var s=Object.prototype.hasOwnProperty,i="~";function o(){}function r(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function a(t,e,n,s,o){if("function"!=typeof n)throw new TypeError("The listener must be a function");var a=new r(n,s||t,o),p=i?i+e:e;return t._events[p]?t._events[p].fn?t._events[p]=[t._events[p],a]:t._events[p].push(a):(t._events[p]=a,t._eventsCount++),t}function p(t,e){0==--t._eventsCount?t._events=new o:delete t._events[e]}function h(){this._events=new o,this._eventsCount=0}Object.create&&(o.prototype=Object.create(null),(new o).__proto__||(i=!1)),h.prototype.eventNames=function(){var t,e,n=[];if(0===this._eventsCount)return n;for(e in t=this._events)s.call(t,e)&&n.push(i?e.slice(1):e);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(t)):n},h.prototype.listeners=function(t){var e=i?i+t:t,n=this._events[e];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,o=n.length,r=new Array(o);s<o;s++)r[s]=n[s].fn;return r},h.prototype.listenerCount=function(t){var e=i?i+t:t,n=this._events[e];return n?n.fn?1:n.length:0},h.prototype.emit=function(t,e,n,s,o,r){var a=i?i+t:t;if(!this._events[a])return!1;var p,h,u=this._events[a],d=arguments.length;if(u.fn){switch(u.once&&this.removeListener(t,u.fn,void 0,!0),d){case 1:return u.fn.call(u.context),!0;case 2:return u.fn.call(u.context,e),!0;case 3:return u.fn.call(u.context,e,n),!0;case 4:return u.fn.call(u.context,e,n,s),!0;case 5:return u.fn.call(u.context,e,n,s,o),!0;case 6:return u.fn.call(u.context,e,n,s,o,r),!0}for(h=1,p=new Array(d-1);h<d;h++)p[h-1]=arguments[h];u.fn.apply(u.context,p)}else{var l,x=u.length;for(h=0;h<x;h++)switch(u[h].once&&this.removeListener(t,u[h].fn,void 0,!0),d){case 1:u[h].fn.call(u[h].context);break;case 2:u[h].fn.call(u[h].context,e);break;case 3:u[h].fn.call(u[h].context,e,n);break;case 4:u[h].fn.call(u[h].context,e,n,s);break;default:if(!p)for(l=1,p=new Array(d-1);l<d;l++)p[l-1]=arguments[l];u[h].fn.apply(u[h].context,p)}}return!0},h.prototype.on=function(t,e,n){return a(this,t,e,n,!1)},h.prototype.once=function(t,e,n){return a(this,t,e,n,!0)},h.prototype.removeListener=function(t,e,n,s){var o=i?i+t:t;if(!this._events[o])return this;if(!e)return p(this,o),this;var r=this._events[o];if(r.fn)r.fn!==e||s&&!r.once||n&&r.context!==n||p(this,o);else{for(var a=0,h=[],u=r.length;a<u;a++)(r[a].fn!==e||s&&!r[a].once||n&&r[a].context!==n)&&h.push(r[a]);h.length?this._events[o]=1===h.length?h[0]:h:p(this,o)}return this},h.prototype.removeAllListeners=function(t){var e;return t?(e=i?i+t:t,this._events[e]&&p(this,e)):(this._events=new o,this._eventsCount=0),this},h.prototype.off=h.prototype.removeListener,h.prototype.addListener=h.prototype.on,h.prefixed=i,h.EventEmitter=h,t.exports=h}])});

/***/ })
/******/ ]);
});