import * as THREE from "three";

class Loader
{
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
    }

    createTextureLoader()
    {
        const brickTexture = this.textureLoader.load('./textures/color.jpg')
        const brickNormalTexture = this.textureLoader.load('./textures/normal.jpg')
    }
}

export default Loader;