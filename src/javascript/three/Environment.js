import * as THREE from "three"
import { loaders } from "./Experience"

export class Environment {
  constructor() {
    this.setEnvironment()
  }

  setEnvironment() {
    this.envMap = loaders.cubeTextureLoader.load([
      "/assets/4/px.png",
      "/assets/4/nx.png",
      "/assets/4/py.png",
      "/assets/4/ny.png",
      "/assets/4/pz.png",
      "/assets/4/nz.png",
    ])
    this.envMap.encoding = THREE.sRGBEncoding
  }
}
