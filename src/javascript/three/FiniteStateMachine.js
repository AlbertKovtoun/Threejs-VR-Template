import * as THREE from "three"
import { pane, player, scene } from "./Experience"

export class FiniteStateMachine {
  constructor() {
    this.setFiniteStateMachineTweaks()
  }

  setFiniteStateMachine(characterParent) {
    this.character = characterParent.scene

    //SkeletonHelper
    const skeleton = new THREE.SkeletonHelper(this.character)
    skeleton.visible = false
    scene.add(skeleton)

    this.characterAnimations = characterParent.animations
    console.log(this.characterAnimations)

    this.mixer = new THREE.AnimationMixer(this.character)

    //IDLE
    this.idleAnimation = this.mixer.clipAction(this.characterAnimations[0])
    //STRAFE LEFT
    this.strafeLeftAnimation = this.mixer.clipAction(
      this.characterAnimations[1]
    )
    //STRAFE RIGHT
    this.strafeRightAnimation = this.mixer.clipAction(
      this.characterAnimations[2]
    )
    //WALK FORWARD
    this.walkForwardAnimation = this.mixer.clipAction(this.characterAnimations[3])

    //WALK BACKWARD
    this.walkBackward = this.walkForwardAnimation.timeScale * -1
    this.idleAnimation.play()
    // this.walkAnimation.play()
    // this.strafeLeftAnimation.play()
    // this.strafeRightAnimation.play()
    // this.idleAnimation.setEffectiveWeight(1)
    // this.walkAnimation.setEffectiveWeight(0)
    // this.strafeLeftAnimation.setEffectiveWeight(0)
    // this.strafeRightAnimation.setEffectiveWeight(0)
  }

  // prepareCrossFade(startAction, endAction, defaultDuration) {
  //   // Switch default / custom crossfade duration (according to the user's choice)

  //   // const duration = this.setCrossFadeDuration(defaultDuration)
  //   const duration = defaultDuration

  //   // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
  //   // else wait until the current action has finished its current loop

  //   if (startAction === this.idleAnimation) {
  //     this.executeCrossFade(startAction, endAction, duration)
  //   } else {
  //     this.synchronizeCrossFade(startAction, endAction, duration)
  //   }
  // }

  // synchronizeCrossFade(startAction, endAction, duration) {
  //   this.mixer.addEventListener("loop", onLoopFinished)

  //   function onLoopFinished(event) {
  //     if (event.action === startAction) {
  //       this.mixer.removeEventListener("loop", onLoopFinished)

  //       this.executeCrossFade(startAction, endAction, duration)
  //     }
  //   }
  // }

  // executeCrossFade(startAction, endAction, duration) {
  //   // Not only the start action, but also the end action must get a weight of 1 before fading
  //   // (concerning the start action this is already guaranteed in this place)

  //   this.setWeight(endAction, 1)
  //   endAction.time = 0

  //   // Crossfade with warping - you can also try without warping by setting the third parameter to false

  //   startAction.crossFadeTo(endAction, duration, true)
  // }

  // setWeight(action, weight) {
  //   action.enabled = true
  //   action.setEffectiveTimeScale(1)
  //   action.setEffectiveWeight(weight)
  // }

  changeAnimation(startAnimation, endAnimation, duration) {
    startAnimation.crossFadeTo(endAnimation, duration)
    endAnimation.play()

    setTimeout(() => {
      startAnimation.stop()
    }, duration * 1000 + 100)
  }

  setFiniteStateMachineTweaks() {
    this.btn1 = pane.addButton({
      label: "Idle to Walk",
      title: "Play",
    })
    this.btn2 = pane.addButton({
      label: "Walk to Left side",
      title: "Play",
    })

    this.btn1.on("click", () => {
      this.changeAnimation(this.idleAnimation, this.walkAnimation, 0.2)
    })
    this.btn2.on("click", () => {
      this.changeAnimation(this.walkAnimation, this.idleAnimation, 0.2)
    })
  }
}
