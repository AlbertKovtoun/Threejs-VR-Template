import * as THREE from "three"
import { scene } from "./Experience"

const vertexShaderPath = "../../shaders/vertex.glsl"
const fragmentShaderPath = "../../shaders/fragment.glsl"

export class Shader {
  constructor() {
    this.setShader()
  }

  setShader() {
    this.shader = new THREE.Mesh(
      new THREE.SphereGeometry(4, 25, 25),
      new THREE.ShaderMaterial({
        // side: THREE.BackSide,
        vertexShader: vertexShaderPath,
        fragmentShader: fragmentShaderPath,
      })
    )
    scene.add(this.shader)
  }
}
