export class MobileControls {
  constructor() {
    this.setMobileControls()
  }

  setMobileControls() {
    if(screen.availHeight > screen.availWidth) {
      alert("Please use Landscape")
    }
  }
}
