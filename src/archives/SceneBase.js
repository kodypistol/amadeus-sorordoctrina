import * as THREE from "three";
import Camera from './Camera'

class SceneBase
{

    constructor() {
        // Canvas
        this.canvas = document.querySelector('canvas.webgl')

        // Scene
        this.scene = new THREE.Scene()

        // Sizes
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Camera
        this.camera = new Camera(this.scene, this.canvas, this.sizes)

        window.addEventListener('resize', () =>
        {
            // Update sizes
            this.sizes.width = window.innerWidth
            this.sizes.height = window.innerHeight

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(this.sizes.width, this.sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

    }





}

export default SceneBase;

