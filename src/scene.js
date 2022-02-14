import Camera from './Camera';
import * as THREE from 'three'

const scene = {
    create(canvasId){
        this.canvas = document.querySelector(canvasId);
        this.threeScene = new THREE.Scene();

        this.camera = new Camera(this.canvas);
        this.threeScene.add(this.camera.getThreeCamera());
    },

    addObject(obj){
        this.threeScene.add(obj);
    },

    getCamera(){
        return this.camera;
    },

    getCanvas(){
        return this.canvas;
    },

    getThreeScene(){
        return this.threeScene;
    }
}

export default scene;