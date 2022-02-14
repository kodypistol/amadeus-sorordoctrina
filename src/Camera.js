import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class Camera {

    constructor(scene, canvas, sizes) {
        // Camera
        this.sizes = sizes
        this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        this.scene = scene;
        this.canvas = canvas;
        this.camera.position.x = 2;
        this.camera.position.y = 1;
        this.camera.position.z = -3;

        scene.add(this.camera);

        // Controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
    }

}