import { renderer } from "./Experience"

export class DeviceStateManager {
  constructor() {
    //Default state
    this.state = "desktop"
    this.checkForInitialState()
  }

  checkForInitialState() {
    // if (screen.availHeight > screen.availWidth) {
    //   alert("Please use Landscape (:")
    // }

    if (typeof screen.orientation !== "undefined") {
      console.log("User is on mobile")
      this.state = "mobile"
    }
  }

  checkForVR() {
    renderer.vrButton.addEventListener("click", () => {
      console.log("User is in VR")
      this.state = "vr"
    })
  }
}
