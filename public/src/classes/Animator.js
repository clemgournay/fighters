import * as THREE from '../vendors/three/three.module.js';

class Animator {

  constructor (game) {
    this.game = game;
    this.mixers = {};
    this.animations = {};
    this.currentAnimations = {};
    this.playing = {};
  }

  create(id, model) {
    this.mixers[id] = new THREE.AnimationMixer(model);
    this.animations[id] = {};
  }

  addAnimation(id, action, index, weight, speed, loop) {
    this.animations[id][action] = this.mixers[id].clipAction(this.mixers[id]._root.animations[index]);
    this.animations[id][action].play();
    this.setWeight(id, action, weight, speed);
    if (weight === 1) this.playing[id] = action;
    if (loop === false) this.animations[id][action].clampWhenFinished = true;
  }


  playFade(id, endAction, duration, callback) {
    const startAction = this.currentAnimations[id];
    const startClip = this.animations[id][startAction];
    const endClip = this.animations[id][endAction];

    endClip.play();
    this.playing[id] = endAction;
    this.setWeight(id, endAction, 1);
    endClip.time = 0;
    startClip.crossFadeTo(endClip, duration);
    this.currentAnimations[id] = endAction;
    if (endClip.clampWhenFinished) {
      this.mixers[id].addEventListener('finished', (e) => {
        console.log(e);
      })
      const totalDuration = (duration*1000) + (endClip._clip.duration * 1000) - 100;
      setTimeout(() => {
        if (callback) callback();
      }, totalDuration);
    } else { // else, callback after animation cross fade
      setTimeout(() => {
        if (callback) callback();
      }, duration);
    }
  }

  update(delta) {
    for (const id in this.mixers) {
      this.mixers[id].update(delta);
    }
  }

  setWeight(id, action, weight, speed) {
    const clip = this.animations[id][action];;
    clip.enabled = true;
    clip.setEffectiveTimeScale(1);
    clip.setEffectiveWeight(weight);
    if (weight === 1) this.currentAnimations[id] = action;
  }

  currentlyPlaying(id) {
    return this.playing[id];
  }


}

export { Animator };