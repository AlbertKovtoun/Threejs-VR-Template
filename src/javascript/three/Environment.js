import * as THREE from "three"
import { loaders } from "./Experience"

export class Environment {
  constructor() {
    this.setEnvironment()
  }

  setEnvironment() {
    this.envMap = loaders.cubeTextureLoader.load([
      "/assets/3/px.png",
      "/assets/3/nx.png",
      "/assets/3/py.png",
      "/assets/3/ny.png",
      "/assets/3/pz.png",
      "/assets/3/nz.png",
    ])
    this.envMap.encoding = THREE.sRGBEncoding
  }
}
