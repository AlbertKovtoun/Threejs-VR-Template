import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export class Loaders {
  constructor(){
    this.setLoaders()
  }

  setLoaders(){
    // this.loadingManager = new THREE.LoadingManager(() => {})

    //Textures
    this.textureLoader = new THREE.TextureLoader()

    //Models
    this.gltfLoader = new GLTFLoader()

    //Env Maps
    this.cubeTextureLoader = new THREE.CubeTextureLoader()
  }
}
