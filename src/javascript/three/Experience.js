import * as THREE from "three"
// import { WebXRController } from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Player } from "./Player"
import { Loaders } from "./Loaders"
import { Raycaster } from "./Raycaster"
import { Shader } from "./Shader"
import { Mirror } from "./Mirror"
import { Environment } from "./Environment"
import { PostProcessing } from "./PostProcessing"
import { Pane } from "tweakpane"
import { CollisionDetector } from "./CollisionDetector"
import { FiniteStateMachine } from "./FiniteStateMachine"
import { MobileControls } from "./MobileControls"

export const pane = new Pane()
export const postProcessingFolder = pane.addFolder({
  title: "Postprocessing",
})

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

const al = new THREE.AmbientLight(0xffffff, 1)
scene.add(al)

// const pl = new THREE.PointLight(0xffffff, 2)
// pl.position.set(0, 1, 0)
// scene.add(pl)

export const loaders = new Loaders()

// export const shader = new Shader()

export const environment = new Environment()
scene.background = environment.envMap

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

export const raycaster = new Raycaster()

export const mirror = new Mirror()

export const player = new Player()

export const finiteStateMachine = new FiniteStateMachine()

export const collisionDetector = new CollisionDetector()

export const postProcessing = new PostProcessing()

//Animate
const clock = new THREE.Clock()
let time = Date.now()

renderer.renderer.setAnimationLoop(() => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  // shader.shader.material.uniforms.uTime.value = elapsedTime

  if (finiteStateMachine.mixer)
    finiteStateMachine.mixer.update(deltaTime * 0.001)

  raycaster.getFirstPersonIntersections()
  raycaster.getLeftControllerIntersections(player.controller1)
  raycaster.getRightControllerIntersections(player.controller2)
  if (player.character) collisionDetector.updateRaycaster()

  // camera.controls.update()

  if (player.character) {
    player.updatePlayer(deltaTime * 0.0005)
  }

  //Render scene
  renderer.renderer.render(scene, camera.camera)
  // postProcessing.effectComposer.render()

  stats.end()
})

// const tick = () => {
//   stats.begin()

//   const elapsedTime = clock.getElapsedTime()

//   // Update controls
//   // camera.controls.update()

//   // Render
//   renderer.renderer.render(scene, camera.camera)

//   setTimeout(() => {
//     window.requestAnimationFrame(tick)
//   }, 1000 / 60)

//   stats.end()
// }

// tick()
