import Camera from './Camera';
import * as THREE from 'three'

const sceneManager = {
    create(canvas){
        this.scene = new THREE.Scene();

        this.camera = new Camera(canvas);
        this.scene.add(this.camera.getThreeCamera());
    },

    addObject(obj){
        this.scene.add(obj);
    },

    getCamera(){
        return this.camera;
    },

    getThreeCamera(){
        return this.camera.getThreeCamera();
    },

    getThreeScene(){
        return this.scene;
    },

    removeObject(obj){
        this.scene.remove(obj);
    }
}

export default sceneManager;