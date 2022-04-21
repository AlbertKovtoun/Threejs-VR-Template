import * as THREE from "three"
import { scene } from "./Experience"

export class Lights {
  constructor() {
    this.setLights()
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(this.ambientLight)

    this.pointLight = new THREE.PointLight("orange", 0.5)
    this.pointLight.position.set(0, 2, 0)
    scene.add(this.pointLight)
  }
}
