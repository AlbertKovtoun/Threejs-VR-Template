import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
import { canvas, scene, sizes } from "./Experience"

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
    // this.controls = new OrbitControls(this.camera, canvas)
    // this.controls.enableDamping = true

    const blocker = document.getElementById("blocker")
    const instructions = document.getElementById("instructions")

    this.controls = new PointerLockControls(this.camera, document.body)

    blocker.addEventListener("click", () => {
      this.controls.lock()
    })

    this.controls.addEventListener("lock", function () {
      instructions.style.display = "none"
      blocker.style.display = "none"
    })

    this.controls.addEventListener("unlock", function () {
      blocker.style.display = "block"
      instructions.style.display = ""
    })

    //No idea why the example does it like this, but I'll roll with it
    // scene.add(this.controls.getObject())
  }
}
