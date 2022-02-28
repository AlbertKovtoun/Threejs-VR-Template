import * as THREE from "three"
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory"
import { camera, loaders, raycaster, renderer, scene } from "./Experience"

// const handsModelPath = "/assets/Hands.gltf"

export class Player {
  constructor() {
    this.currentIntersect = null
    this.setPlayer()
    this.setPlayerHands()
    // raycaster.getIntersections(this.controller1)
  }

  setPlayer() {
    //Swap out this Object3D() for a playerMesh
    // this.player = new THREE.Object3D()
    // this.player.position.z = 4
    // this.player.add(camera.camera)
    // scene.add(this.player)
  }

  setPlayerHands() {
    //Hand model
    // loaders.gltfLoader.load(handsModelPath, (gltf) => {
    //   this.hands = gltf.scene

    //   this.leftHand = this.hands.getObjectByName("LeftHand")
    //   this.rightHand = this.hands.getObjectByName("RightHand")

    //   scene.add(this.hands)
    // })

    this.controller1 = renderer.renderer.xr.getController(0)
    this.controller2 = renderer.renderer.xr.getController(1)

    //EventListener for when user is pressing main button
    this.controller1.addEventListener("selectstart", () => {
      if (raycaster.currentIntersect) {
        //If statement to check which object is being clicked on
        if (raycaster.currentIntersect.object.name === "OBJECT") {
          console.log("Clicked on OBJECT")
          raycaster.object.material.color = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
          )
        }
      }
    })
    scene.add(this.controller1, this.controller2)

    this.controllerModelFactory = new XRControllerModelFactory()

    this.controllerGrip1 = renderer.renderer.xr.getControllerGrip(0)
    this.controllerGrip1.add(
      this.controllerModelFactory.createControllerModel(this.controllerGrip1)
    )
    scene.add(this.controllerGrip1)

    this.controllerGrip2 = renderer.renderer.xr.getControllerGrip(1)
    this.controllerGrip2.add(
      this.controllerModelFactory.createControllerModel(this.controllerGrip2)
    )
    scene.add(this.controllerGrip2)

    //Add visual line
    const laserHelper = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1),
    ])

    this.lazer = new THREE.Line(laserHelper)
    this.lazer.scale.z = 5

    this.controller1.add(this.lazer.clone())
    this.controller2.add(this.lazer.clone())
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
