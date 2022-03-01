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

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 2, 2),
  new THREE.MeshStandardMaterial({
    color: "black",
    roughness: 0,
    envMap: environment.envMap,
    envMapIntensity: 2.5,
  })
)
floor.rotation.x = -Math.PI / 2
scene.add(floor)

//Animate
const clock = new THREE.Clock()

renderer.renderer.setAnimationLoop(() => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  // shader.shader.material.uniforms.uTime.value = elapsedTime

  if (player.mixer) player.mixer.update(0.005)

  raycaster.getIntersections(player.controller1)

  if (player.hands) player.updatePlayerHands()

  // camera.controls.update()

  renderer.renderer.render(scene, camera.camera)

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
