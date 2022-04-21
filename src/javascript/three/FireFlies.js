import * as THREE from "three"

import fireFliesVertexShader from "../../shaders/fireflies/vertex.glsl"
import fireFliesFragmentShader from "../../shaders/fireflies/fragment.glsl"
import { camera, scene } from "./Experience"

export class FireFlies {
  constructor() {
    this.setFireFlies()
    this.updateFireFliesPosition()
  }

  setFireFlies() {
    const fireFliesCount = 500

    const fireFliesGeometry = new THREE.BufferGeometry()

    const positions = []
    const positionVectors = []
    const randoms = new Float32Array(fireFliesCount)

    const n = 2,
      n2 = n / 2 // particles spread in the sphere + put sphere in center

    for (let i = 0; i < fireFliesCount; i++) {
      // positions
      const x = Math.random() * n - n2
      const y = Math.random() * n - n2
      const z = Math.random() * n - n2

      positionVectors.push(new THREE.Vector3(x, y, z))

      if (positionVectors[i].distanceTo(new THREE.Vector3(0, 0, 0)) < n / 2) {
        positions.push(x, y, z)
        randoms[i] = Math.random()
      }
    }

    fireFliesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    fireFliesGeometry.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(randoms, 1)
    )

    fireFliesGeometry.computeBoundingSphere()

    this.fireFliesMaterial = new THREE.ShaderMaterial({
      vertexShader: fireFliesVertexShader,
      fragmentShader: fireFliesFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,

      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uColor1: {
          value: new THREE.Color("orange"),
        },
        uColor2: {
          value: new THREE.Color("red"),
        },
      },
    })

    this.fireFliesPoints = new THREE.Points(
      fireFliesGeometry,
      this.fireFliesMaterial
    )
    scene.add(this.fireFliesPoints)
  }

  updateFireFliesPosition(elapsedTime) {
    this.fireFliesMaterial.uniforms.uTime.value = elapsedTime

    this.fireFliesPoints.position.copy(camera.camera.position)

    this.fireFliesPoints.rotation.y = elapsedTime * 0.1
  }
}
