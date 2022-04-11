import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
import { canvas, deviceStateManager, scene, sizes } from "./Experience"
import { MobileControls } from "./MobileControls"

export class Camera {
  constructor() {
    this.setCamera()
    this.setCameraControls()
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.01,
      100
    )
    this.camera.rotation.set(0, -Math.PI / 2, 0)
    this.camera.position.set(0, 1.6, 0)
    scene.add(this.camera)
  }

  setCameraControls() {
    this.controls = new PointerLockControls(this.camera, canvas)
    this.mobileControls = new MobileControls(this.camera)
  }
}
