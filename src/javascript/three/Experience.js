import * as THREE from "three"
// import { WebXRController } from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Player } from "./Player"
import { Loaders } from "./Loaders"
import {Raycaster} from "./Raycaster"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

const al = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(al)

const pl = new THREE.PointLight(0xffffff, 10)
pl.position.set(0, 1, 0)
scene.add(pl)

export const loaders = new Loaders()

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 2, 2),
  new THREE.MeshStandardMaterial({ color: "blue" })
)
floor.rotation.x = -Math.PI / 2
scene.add(floor)

const cube = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.3, 20, 40),
  new THREE.MeshBasicMaterial({ color: "black" })
)
cube.position.set(0, 1.6, -10)
scene.add(cube)

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

export const raycaster = new Raycaster()

export const player = new Player()

//Animate
const clock = new THREE.Clock()

setInterval(() => {
  player.getIntersections()
}, 500)

renderer.renderer.setAnimationLoop(() => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  if (player.hands) player.updatePlayerHands()

  camera.controls.update()

  renderer.renderer.render(scene, camera.camera)

  stats.end()
})

// const tick = () => {
//   stats.begin()

//   const elapsedTime = clock.getElapsedTime()

//   // Update controls
//   camera.controls.update()

//   // Render
//   renderer.renderer.render(scene, camera.camera)

//   setTimeout(() => {
//     window.requestAnimationFrame(tick)
//   }, 1000 / 60)

//   stats.end()
// }

// tick()
