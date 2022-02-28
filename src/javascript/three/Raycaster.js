import * as THREE from "three"
import { player, scene } from "./Experience"

export class Raycaster {
  constructor() {
    this.raycaster = new THREE.Raycaster()
    this.tempMatrix = new THREE.Matrix4()
    this.currentIntersect = null

    this.setObjectsToTest()
    this.setVRRaycaster()
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

  setVRRaycaster() {}

  getIntersections(controller1) {
    this.tempMatrix.identity().extractRotation(controller1.matrixWorld)
    this.raycaster.ray.origin.setFromMatrixPosition(controller1.matrixWorld)
    this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix)
    const intersects = this.raycaster.intersectObjects(
      this.group.children,
      false
    )

    if (intersects.length) {
      if (!this.currentIntersect) {
        console.log("Raycaster Entered object")
      }
      this.currentIntersect = intersects[0]
    } else {
      if (this.currentIntersect) {
        console.log("Raycaster Left object")
      }
      this.currentIntersect = null
    }
  }
}
