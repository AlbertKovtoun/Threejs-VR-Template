import * as THREE from "three"
import { camera, loaders, renderer, scene } from "./Experience"

const handsModelPath = "/assets/Hands.gltf"

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

    loaders.gltfLoader.load(handsModelPath, (gltf) => {
      this.hands = gltf.scene

      this.leftHand = this.hands.getObjectByName("LeftHand")
      this.rightHand = this.hands.getObjectByName("RightHand")

      scene.add(this.hands)
    })
  }

  updatePlayerHands() {
    // this.hand1.position.copy(renderer.renderer.xr.getController(0).position)
    // this.hand2.position.copy(renderer.renderer.xr.getController(1).position)

    // this.hand1.rotation.copy(renderer.renderer.xr.getController(0).rotation)
    // this.hand2.rotation.copy(renderer.renderer.xr.getController(1).rotation)

    this.rightHand.position.copy(renderer.renderer.xr.getController(0).position)
    this.leftHand.position.copy(renderer.renderer.xr.getController(1).position)

    this.rightHand.rotation.copy(renderer.renderer.xr.getController(0).rotation)
    this.leftHand.rotation.copy(renderer.renderer.xr.getController(1).rotation)
  }
}
