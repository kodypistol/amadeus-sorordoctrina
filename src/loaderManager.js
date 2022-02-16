import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import sceneManager from "./scene";
import * as THREE from "three";

const loaderManager = {

    loadMultipleGLTFs(objects, callback)
    {
        this.queue = [];
        this.loadedAssets = {};

        this.callback = callback;

        for(let key in objects)
        {
            this.queue.push(
                {
                    key: key,
                    url: objects[key]
                }
            );
        }
        console.log('Start loading : ', this.queue);

        this.loadQueue()

    },
    loadQueue() {
        const fileToLoad = this.queue[0];
        console.log('Start loading : ' + fileToLoad.key);

        this.loadGLTF(fileToLoad.url, (gltf) => {
            console.log('Finish loading : ' + fileToLoad.key);

            // ici, on stocke le fichier chargé dans le tableau this.loadedAssets
            this.loadedAssets[fileToLoad.key] = gltf;
            this.queue.shift();
            if(this.queue.length > 0) {
                this.loadQueue();
            } else {
                this.onFinishQueue()
            }

        });
    },

    onFinishQueue(){
        this.callback(this.loadedAssets)
    },

    loadGLTF(path, callback){
        // ./assets3D/mozartStatue/photoscan_mozart.gltf
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./encoder/draco/');

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        gltfLoader.load(
            path,
            (gltf) =>
            {
                callback(gltf)
            },
            () =>
            {
                console.log('progress')
            },
            (e) =>
            {
                console.log('error: ' + e)
            },

        );
    },

    loadTextures()
    {
        this.textureLoader = new THREE.TextureLoader();
        this.brickTexture = this.textureLoader.load('./textures/color.jpg');
        this.brickNormalTexture = this.textureLoader.load('./textures/normal.jpg');
        const textures = [this.brickTexture, this.brickNormalTexture]
        return textures
    },
}
export default loaderManager;