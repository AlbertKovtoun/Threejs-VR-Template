import * as THREE from "three"
import { player, scene } from "./Experience"

export class FiniteStateMachine {
  constructor() {}

  setFiniteStateMachine(characterParent) {
    this.character = characterParent.scene

    //SkeletonHelper
    const skeleton = new THREE.SkeletonHelper(this.character)
    skeleton.visible = false
    scene.add(skeleton)

    this.characterAnimations = characterParent.animations
    console.log(this.characterAnimations)

    this.mixer = new THREE.AnimationMixer(this.character)

    this.idleAnimation = this.mixer.clipAction(this.characterAnimations[0]) //IDLE
    this.strafeLeftAnimation = this.mixer.clipAction(
      this.characterAnimations[1]
    ) //STRAFE LEFT
    this.strafeLeftAnimation.play()
  }
}
