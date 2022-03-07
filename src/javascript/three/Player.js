import * as THREE from "three"
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory"
import {
  camera,
  collisionDetector,
  environment,
  loaders,
  raycaster,
  renderer,
  scene,
} from "./Experience"

// const handsModelPath = "/assets/Hands.gltf"

export class Player {
  constructor() {
    this.currentIntersect = null
    this.frameCounter = 0
    this.prevPositionX = null
    this.prevPositionZ = null

    this.moveForward = false
    this.moveBackward = false
    this.moveLeft = false
    this.moveRight = false
    this.isRunning = false

    this.velocity = new THREE.Vector3()
    this.direction = new THREE.Vector3()

    this.loadPlayer()
    this.setPlayer()
    this.setPlayerHands()
    this.checkIntersections()
  }

  loadPlayer() {
    loaders.gltfLoader.load("/assets/Character.gltf", (gltf) => {
      this.character = gltf.scene

      this.character.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = environment.envMap
          child.material.envMapIntensity = 2.5
        }
      })

      //SkeletonHelper
      const skeleton = new THREE.SkeletonHelper(this.character)
      scene.add(skeleton)

      this.characterAnimations = gltf.animations

      this.mixer = new THREE.AnimationMixer(this.character)
      this.action = this.mixer.clipAction(this.characterAnimations[0])
      // this.action.play()

      this.character.position.z = -2
      scene.add(this.character)
    })

    //Swap out this Object3D() for a playerMesh
    // this.player = new THREE.Object3D()
    // this.player.position.z = 4
    // this.player.add(camera.camera)
    // scene.add(this.player)
  }

  setPlayer() {
    // this.character.position.z = 2
    // this.character.add(camera.camera)

    // Keydown
    document.addEventListener("keydown", (ev) => {
      switch (ev.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = true
          break

        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = true
          break

        case "ArrowDown":
        case "KeyS":
          this.moveBackward = true
          break

        case "ArrowRight":
        case "KeyD":
          this.moveRight = true
          break

        case "ShiftLeft":
          this.isRunning = true
          break
      }
    })

    // Keyup
    document.addEventListener("keyup", (ev) => {
      switch (ev.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = false
          break

        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = false
          break

        case "ArrowDown":
        case "KeyS":
          this.moveBackward = false
          break

        case "ArrowRight":
        case "KeyD":
          this.moveRight = false
          break

        case "ShiftLeft":
          this.isRunning = false
          break
      }
    })
  }

  updatePlayer() {
    let playerSpeed = 0.002

    if (camera.controls.isLocked) {
      this.velocity.x -= this.velocity.x * 0.1 //Momentum (lower = more momentum)
      this.velocity.z -= this.velocity.z * 0.1

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward)
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft)
      this.direction.normalize() // this ensures consistent movements in all directions

      // Check if player is running
      if (this.isRunning) {
        playerSpeed *= 2
      }

      if (this.moveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * playerSpeed
      if (this.moveLeft || this.moveRight)
        this.velocity.x -= this.direction.x * playerSpeed

      if (collisionDetector.movementBlocked) {
        // Option1
        camera.camera.position.x = Math.round(this.prevPositionX)
        camera.camera.position.z = Math.round(this.prevPositionZ)

        // Option2
        // camera.camera.position.x = this.prevPositionX
        // camera.camera.position.z = this.prevPositionZ

        //Option3
        // camera.camera.position.x = Math.round((this.prevPositionX + Number.EPSILON) * 10) / 10
        // camera.camera.position.z = Math.round((this.prevPositionZ + Number.EPSILON) * 10) / 10
      } else {
        camera.controls.moveRight(-this.velocity.x)
        camera.controls.moveForward(-this.velocity.z)
      }

      if (this.frameCounter === 10) {
        this.prevPositionX = camera.camera.position.x
        this.prevPositionZ = camera.camera.position.z
        this.frameCounter = 0
      } else {
        this.frameCounter++
      }

      if (collisionDetector.playerIsStuck) {
        camera.camera.position.x = 0
        camera.camera.position.z = 0
        collisionDetector.playerIsStuck = false
      }
    }

    // this.character.position.copy(camera.camera.position)
    this.character.position.x = camera.camera.position.x
    this.character.position.z = camera.camera.position.z

    this.character.rotation.copy(camera.camera.rotation)

    //Still need to fix this. This ain't right chief
    // this.character.rotation.y = camera.camera.rotation.y
  }

  setPlayerHands() {
    //Hand model
    // loaders.gltfLoader.load(handsModelPath, (gltf) => {
    //   this.hands = gltf.scene

    //   this.leftHand = this.hands.getObjectByName("LeftHand")
    //   this.rightHand = this.hands.getObjectByName("RightHand")

    //   scene.add(this.hands)
    // })

    //Left Controller
    this.controller1 = renderer.renderer.xr.getController(0)
    //Right Controller
    this.controller2 = renderer.renderer.xr.getController(1)

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

  checkIntersections() {
    //First Person View (from the center)
    document.addEventListener("click", () => {
      if (raycaster.firstPersonOptions.currentIntersect) {
        //If statement to check which object is being clicked on
        if (
          raycaster.firstPersonOptions.currentIntersect.object.name === "OBJECT"
        ) {
          console.log("Left controller Clicked on OBJECT")
          raycaster.object.material.color = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
          )
        }
      }
    })

    //Left controller in VR
    //EventListener for when user is pressing main button
    this.controller1.addEventListener("selectstart", () => {
      if (raycaster.leftControllerOptions.currentIntersect) {
        //If statement to check which object is being clicked on
        if (
          raycaster.leftControllerOptions.currentIntersect.object.name ===
          "OBJECT"
        ) {
          console.log("Left controller Clicked on OBJECT")
          raycaster.object.material.color = new THREE.Color(0xff0000)
        }
      }
    })

    //Right controller in VR
    this.controller2.addEventListener("selectstart", () => {
      if (raycaster.rightControllerOptions.currentIntersect) {
        //If statement to check which object is being clicked on
        if (
          raycaster.rightControllerOptions.currentIntersect.object.name ===
          "OBJECT"
        ) {
          console.log("Right Clicked on OBJECT")
          raycaster.object.material.color = new THREE.Color(0x00ff00)
        }
      }
    })
  }
}
