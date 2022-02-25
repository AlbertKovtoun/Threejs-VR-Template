import * as THREE from "three"
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory"
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
    // this.hand1 = new THREE.Mesh(
    //   new THREE.BoxGeometry(0.15, 0.15, 0.15),
    //   new THREE.MeshBasicMaterial({ color: "red" })
    // )
    // scene.add(this.hand1)
    // this.hand2 = new THREE.Mesh(
    //   new THREE.BoxGeometry(0.15, 0.15, 0.15),
    //   new THREE.MeshBasicMaterial({ color: "red" })
    // )
    // scene.add(this.hand2)

    loaders.gltfLoader.load(handsModelPath, (gltf) => {
      this.hands = gltf.scene

      this.leftHand = this.hands.getObjectByName("LeftHand")
      this.rightHand = this.hands.getObjectByName("RightHand")

      scene.add(this.hands)
    })

    this.controller1 = renderer.renderer.xr.getController(0)
    this.controller2 = renderer.renderer.xr.getController(1)
    scene.add(this.controller1, this.controller2)

    this.controllerModelFactory = new XRControllerModelFactory()

    this.controllerGrip1 = renderer.renderer.xr.getControllerGrip(0)
    this.controllerGrip1.add(this.controllerModelFactory.createControllerModel(this.controllerGrip1))
    scene.add(this.controllerGrip1)

    this.controllerGrip2 = renderer.renderer.xr.getControllerGrip(1)
    this.controllerGrip2.add(this.controllerModelFactory.createControllerModel(this.controllerGrip2))
    scene.add(this.controllerGrip2)
  }

  updatePlayerHands() {

    // this.leftHand.position.copy(
    //   renderer.renderer.xr.getControllerGrip(0).position
    // )
    // this.rightHand.position.copy(
    //   renderer.renderer.xr.getControllerGrip(1).position
    // )

    // this.leftHand.rotation.copy(
    //   renderer.renderer.xr.getControllerGrip(0).rotation
    // )
    // this.rightHand.rotation.copy(
    //   renderer.renderer.xr.getControllerGrip(1).rotation
    // )
  }
}
