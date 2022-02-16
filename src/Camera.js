import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Camera {
    constructor(canvas) {
        // Create a perspective camera
        this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.threeCamera.position.x = 0;
        this.threeCamera.position.y = 0;
        this.threeCamera.position.z = 0;

        window.addEventListener('resize', () =>
        {
            // Update camera
            this.threeCamera.aspect = window.innerWidth / window.innerHeight;
            this.threeCamera.updateProjectionMatrix();
        });

        // // Create controls on camera
        // this.controls = new OrbitControls(this.threeCamera, canvas);
        // this.controls.enableDamping = true;
    }

    getThreeCamera(){
        return this.threeCamera;
    }

    update(){
        // this.controls.update();
    }
}

export default Camera;