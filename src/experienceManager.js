import * as THREE from 'three';
import signal from 'signal-js';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import gsap from 'gsap'

import scene from "./scene";
import renderer from "./renderer";
import Camera from './Camera';
import bridgeScene from './acts/act1-bridgeScene'
import bridgeLoop from "./archives/BridgeLoop";
import router from "./router";

const canvas = document.querySelector("canvas.webgl");

const experienceManager =
{
    init()
    {
        // Scene
        scene.create(canvas);

        this.loadTextures();
        bridgeScene.init();

        // Renderer
        renderer.init(canvas);

        // Tick loop
        this.startLoopExperience(2);

        signal.on('changeScreen', this.onChangeScreen)
    },

    onChangeScreen(index)
    {

        switch(index)
        {
            case 0:
                canvas.style.display = 'none';
                break;

            case 1:
                console.log('go to screen1 in three js scene')
                canvas.style.display = 'block';
                experienceManager.fillScene(index);
                document.querySelector('body').style.backgroundColor = 'yellow'
                break;
            case 2:
                console.log('go to screen2 in three js scene')
                experienceManager.fillScene(index);
                break;
            case 3:
                console.log('go to screen3 in three js scene')
                experienceManager.fillScene(index);
                break;
        }
    },

    loadTextures()
    {
        this.textureLoader = new THREE.TextureLoader();
        this.brickTexture = this.textureLoader.load('./textures/color.jpg');
        this.brickNormalTexture = this.textureLoader.load('./textures/normal.jpg');
        const textures = [this.brickTexture, this.brickNormalTexture]
        return textures
    },

    fillScene(index)
    {

        switch (index)
        {
            case 1:

                const dracoLoader = new DRACOLoader();
                dracoLoader.setDecoderPath('./encoder/draco/');

                const gltfLoader = new GLTFLoader();
                gltfLoader.setDRACOLoader(dracoLoader);

                let mozartStatue = null;

                gltfLoader.load(
                    './assets3D/mozartStatue/photoscan_mozart.gltf',
                    (gltf) =>
                    {
                        gltf.scene.scale.set(0.3, 0.3, 0.3);
                        gltf.scene.position.set(0, -0.5, -5);
                        gltf.scene.rotation.set(Math.PI / 8, - Math.PI * 1.25, 0);
                        gltf.transparent = true;
                        gltf.castShadow = true;
                        scene.addObject(gltf.scene);
                        mozartStatue = gltf
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


                const directionalLight = new THREE.DirectionalLight(0xfffffff, 2)
                directionalLight.position.set(-2, 2, 1)
                directionalLight.castShadow = true
                scene.addObject(directionalLight)

                const lightAxisHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
                scene.addObject(lightAxisHelper)

                break;

            case 2:
                // ÉCRAN SCÈNE 3D ACTE 2
                console.log('acte 2')

                const moveToAct3 = () =>
                {
                    scene.removeObject(scene.getThreeScene().children[5])
                    setTimeout(() =>
                    {
                        //router.showScreen(3);
                    }, 3000)
                }

                gsap.to(scene.getThreeScene().children[5].children[0].material, {
                    opacity: 0,
                    onComplete: moveToAct3
                })



                break;
            case 3:
                bridgeScene.startAnimation();
                bridgeScene.addAct1Object();
                break;
            default:
        }

    },

    startLoopExperience(){
        this.clock = new THREE.Clock();
        this.lastElapsedTime = 0;

        this.tick = () =>
        {
            this.elapsedTime = this.clock.getElapsedTime()
            this.deltaTime = this.elapsedTime - this.lastElapsedTime
            this.lastElapsedTime = this.elapsedTime

            // Update controls
            scene.getCamera().update();

            // Start the bridge loop
            bridgeScene.bridgeLoop();

            // Render
            renderer.draw(scene);

            // Call tick again on the next frame
            window.requestAnimationFrame(this.tick);
        }

        this.tick();
    }
}

export default experienceManager;