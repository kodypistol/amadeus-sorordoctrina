import Camera from './Camera';
import * as THREE from 'three'

const sceneManager = {
    create(canvas){
        this.scene = new THREE.Scene();

        this.camera = new Camera(canvas);
        this.scene.add(this.camera.getThreeCamera());
        this.scene.fog = new THREE.Fog( 0xf2f7ff, 0, 8 );
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
    },
    getCurrentObject(){
        switch (this.getCurrentScene())
        {
            case 1:
                return
                break;
        }
    }
}

export default sceneManager;