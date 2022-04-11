import { deviceStateManager, camera, renderer } from "./Experience"

export class DeviceStateManager {
  constructor() {
    //Default state
    this.state = "desktop"
    this.checkForInitialState()
  }

  checkForInitialState() {
    if (screen.availHeight > screen.availWidth) {
      alert("Please use Landscape for the best experience (:")
    }

    //Check for touch device
    if ("ontouchstart" in document.documentElement) {
      this.state = "mobile"
    }
  }

  checkForVR() {
    renderer.vrButton.addEventListener("click", () => {
      console.log("User is in VR")
      this.state = "vr"
    })
  }

  executeForDevice() {
    const zoneJoystick = document.querySelector(".zone-joystick")

    const blocker = document.querySelector("#blocker")
    const instructions = document.querySelector("#instructions")
    const instructionsText = document.querySelector("#instructions-text")

    //DESKTOP
    if (deviceStateManager.state === "desktop") {
      instructionsText.innerHTML = "Click to enter (DESKTOP)"

      blocker.addEventListener("click", () => {
        camera.controls.lock()
      })
      camera.controls.addEventListener("lock", function () {
        instructions.style.display = "none"
        blocker.style.display = "none"
      })
      camera.controls.addEventListener("unlock", function () {
        blocker.style.display = "block"
        instructions.style.display = ""
      })
    }

    //MOBILE
    if (deviceStateManager.state === "mobile") {
      instructionsText.innerHTML = "Click to enter (MOBILE)"

      zoneJoystick.style.display = "block"

      //Maybe add a nice fadeout animation
      blocker.addEventListener("click", () => {
        blocker.style.display = "none"
      })
    }
  }
}
