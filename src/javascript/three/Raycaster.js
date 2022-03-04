import * as THREE from "three"
import { player, scene } from "./Experience"

export class Raycaster {
  constructor() {
    this.rightControllerOptions = {
      raycaster: new THREE.Raycaster(),
      tempMatrix: new THREE.Matrix4(),
      currentIntersect: null
    }
    this.raycaster = new THREE.Raycaster()
    this.tempMatrix = new THREE.Matrix4()
    this.currentIntersect = null

    this.setObjectsToTest()
  }

  setObjectsToTest() {
    this.group = new THREE.Group()
    scene.add(this.group)

    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1),
      new THREE.MeshBasicMaterial({ color: "" })
    )
    this.object.name = "OBJECT"
    this.object.position.set(0, 0.5, -5)
    this.group.add(this.object)
  }

  getRightControllerIntersections(controller1) {
    this.rightControllerOptions.tempMatrix.identity().extractRotation(controller1.matrixWorld)
    this.rightControllerOptions.raycaster.ray.origin.setFromMatrixPosition(controller1.matrixWorld)
    this.rightControllerOptions.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.rightControllerOptions.tempMatrix)
    const intersects = this.rightControllerOptions.raycaster.intersectObjects(
      this.group.children,
      false
    )

    if (intersects.length) {
      if (!this.rightControllerOptions.currentIntersect) {
        console.log("Raycaster Entered object")
      }
      this.rightControllerOptions.currentIntersect = intersects[0]
    } else {
      if (this.rightControllerOptions.currentIntersect) {
        console.log("Raycaster Left object")
      }
      this.rightControllerOptions.currentIntersect = null
    }
  }
}
