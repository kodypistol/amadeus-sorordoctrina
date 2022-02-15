import Camera from './Camera';
import * as THREE from 'three'

const scene = {
    create(canvas){
        this.threeScene = new THREE.Scene();

        this.camera = new Camera(canvas);
        this.threeScene.add(this.camera.getThreeCamera());
    },

    addObject(obj){
        this.threeScene.add(obj);
    },

    getCamera(){
        return this.camera;
    },

    getThreeCamera(){
        return this.camera.getThreeCamera();
    },

    getThreeScene(){
        return this.threeScene;
    }
}

export default scene;