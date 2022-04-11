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
    const instructionsText = document.getElementById("instructions-text")
    const blocker = document.getElementById("blocker")
    const instructions = document.getElementById("instructions")

    this.controls = new PointerLockControls(this.camera, canvas)
    this.mobileControls = new MobileControls(this.camera)

    if (deviceStateManager.state === "desktop") {
      instructionsText.innerHTML = "Click to enter (DESKTOP)"

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
    }

    if (deviceStateManager.state === "mobile") {
      instructionsText.innerHTML = "Click to enter (MOBILE)"

      //Maybe add a nice fadeout animation
      blocker.addEventListener("click", () => {
        blocker.style.display = "none"
      })
    }
  }
}
