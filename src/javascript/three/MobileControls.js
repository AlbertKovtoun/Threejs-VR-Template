import * as THREE from "three"
import nipplejs from "nipplejs"
import { camera, finiteStateMachine } from "./Experience"

export class MobileControls {
  constructor() {
    this.moveForward = false
    this.moveBackward = false
    this.moveLeft = false
    this.moveRight = false
    this.setMobileControls()
  }

  setMobileControls() {
    if (screen.availHeight > screen.availWidth) {
      alert("Please use Landscape (:")
    }

    const joystickOptions = {
      zone: document.querySelector(".zone-joystick"),
      color: "purple",
    }

    const joystickManager = nipplejs.create(joystickOptions)

    joystickManager.on("move", (evData, joystickData) => {
      // console.log(joystickData.vector)

      if (joystickData.vector.y > 0.5) {
        this.moveForward = true
      } else {
        this.moveForward = false
      }
    })
  }
  updatePlayer() {
    // if (this.moveForward) {
      // camera.camera.translateY(0.005)
    // }

  }
}
