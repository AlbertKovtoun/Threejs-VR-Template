import * as THREE from "three"
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory"
import { camera, loaders, renderer, scene } from "./Experience"

const handsModelPath = "/assets/Hands.gltf"

export class Player {
  constructor() {
    this.currentIntersect = null
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
    //Hand model
    // loaders.gltfLoader.load(handsModelPath, (gltf) => {
    //   this.hands = gltf.scene

    //   this.leftHand = this.hands.getObjectByName("LeftHand")
    //   this.rightHand = this.hands.getObjectByName("RightHand")

    //   scene.add(this.hands)
    // })

    this.controller1 = renderer.renderer.xr.getController(0)
    this.controller2 = renderer.renderer.xr.getController(1)
    // this.controller1.addEventListener("selectstart", this.onSelectStart)
    this.controller1.addEventListener("selectstart", () => {
      if (this.currentIntersect) {
        if (this.currentIntersect.object.name === "OBJECT") {
          console.log("Clicked on OBJECT")
          this.object.material.color = new THREE.Color(Math.random(), Math.random(), Math.random())
        }
      }
    })

    // this.controller1.addEventListener("selectend", this.onSelectEnd)
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
    //!Important
    this.lazer.name = "lazer"
    this.lazer.scale.z = 5

    this.controller1.add(this.lazer.clone())
    this.controller2.add(this.lazer.clone())

    this.tempMatrix = new THREE.Matrix4()

    this.raycaster = new THREE.Raycaster()

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

  getIntersections() {
    this.tempMatrix.identity().extractRotation(this.controller1.matrixWorld)
    this.raycaster.ray.origin.setFromMatrixPosition(
      this.controller1.matrixWorld
    )
    this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix)
    const intersects = this.raycaster.intersectObjects(
      this.group.children,
      false
    )

    if (intersects.length) {
      if (!this.currentIntersect) {
        console.log("Mouse enter")
      }
      this.currentIntersect = intersects[0]
    } else {
      if (this.currentIntersect) {
        console.log("Mouse leave")
      }
      this.currentIntersect = null
    }
  }

  onSelectStart(event) {
    const controller = event.target

    // const intersections = this.getIntersections(controller)

    const intersections = this.raycaster.intersectObjects(
      this.group.children,
      false
    )

    if (intersections.length > 0) {
      const intersection = intersections[0]

      const object = intersection.object
      object.material.color = new THREE.Color(0xff0000)
      //
    }
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
