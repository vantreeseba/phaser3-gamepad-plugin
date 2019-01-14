/**
 * Exocraft (https://exocraft.io)
 * Copyright (c) 2017 - 2018, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

const GamePadManager = require('gamepad-events');

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
