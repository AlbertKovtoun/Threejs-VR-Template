import * as THREE from "three"
import { VRButton } from "three/examples/jsm/webxr/VRButton" 
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

const cube = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.3, 20, 40),
  new THREE.MeshBasicMaterial({ color: "black", wireframe: true })
)
scene.add(cube)

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

document.body.appendChild(VRButton.createButton(renderer.renderer))
renderer.renderer.xr.enabled = true

//Animate
const clock = new THREE.Clock()

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  setTimeout(() => {
    window.requestAnimationFrame(tick)
  }, 1000 / 60)

  stats.end()
}

tick()
