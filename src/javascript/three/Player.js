import * as THREE from "three"
import { camera, renderer, scene } from "./Experience"

export class Player {
  constructor() {
    this.setPlayer()
    this.setPlayerHands()
  }

  setPlayer() {
    //Swap out this Object3D() for a playerMesh
    // this.player = new THREE.Object3D()
    // this.player.position.z = 4
    // this.player.add(camera.camera)
    // scene.add(this.player)
  }

  setPlayerHands() {
    this.hand1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.15, 0.15),
      new THREE.MeshBasicMaterial({ color: "red" })
    )
    scene.add(this.hand1)
    this.hand2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.15, 0.15),
      new THREE.MeshBasicMaterial({ color: "red" })
    )
    scene.add(this.hand2)
  }

  updatePlayerHands() {
    this.hand1.position.copy(renderer.renderer.xr.getController(0).position)
    this.hand2.position.copy(renderer.renderer.xr.getController(1).position)

    this.hand1.rotation.copy(renderer.renderer.xr.getController(0).rotation)
    this.hand2.rotation.copy(renderer.renderer.xr.getController(1).rotation)
  }
}
