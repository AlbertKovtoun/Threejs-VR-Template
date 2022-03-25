import * as THREE from "three"
import { scene, environment, camera, player } from "./Experience"

export class CollisionDetector {
  constructor() {
    this.raycaster = new THREE.Raycaster()
    this.currentIntersect = null
    this.movementBlocked = false

    this.setCollisionDetector()
  }

  setCollisionDetector() {
    this.detectionMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20, 2, 2),
      new THREE.MeshStandardMaterial({
        color: "black",
        roughness: 0.5,
        envMap: environment.envMap,
        envMapIntensity: 2.5,
      })
    )
    // this.detectionMesh.position.y = -1
    this.detectionMesh.rotation.x = -Math.PI / 2
    scene.add(this.detectionMesh)
  }

  updateRaycaster() {
    //Raycaster pointing down
    this.raycaster.ray.set(camera.camera.position, new THREE.Vector3(0, -1, 0))

    const intersects = this.raycaster.intersectObject(this.detectionMesh)

    if (intersects.length) {
      if (!this.currentIntersect) {
        //Player on detectionMesh
        console.log("Free movement")
        this.movementBlocked = false
      }

      this.currentIntersect = intersects[0]
    } else {
      if (this.currentIntersect) {
        //Player off detectionMesh
        console.log("Movement blocked")
        this.movementBlocked = true
      }

      this.currentIntersect = null
    }
  }
}
