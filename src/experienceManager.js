import * as THREE from 'three';
import signal from 'signal-js';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import gsap from 'gsap'

import sceneManager from "./scene";
import renderer from "./renderer";
import loaderManager from './loaderManager'
import assets from './assets'
import Camera from './Camera';
import bridgeScene from './acts/act1-bridgeScene'
import bridgeLoop from "./archives/BridgeLoop";
import router from "./router";

const canvas = document.querySelector("canvas.webgl");

const experienceManager =
    {
        objects: {
            statue: null,
            clavecin: null,
            parchemin: null,
            bottle: null
        },

        init()
        {
            // Scene
            sceneManager.create(canvas);

            this.textures = loaderManager.loadTextures();
            bridgeScene.init();

            // Renderer
            renderer.init(canvas);

            // Tick loop
            this.startLoopExperience(2);

            signal.on('changeScreen', this.onChangeScreen)

            loaderManager.loadMultipleGLTFs({
                mozart: assets.mozart,
                bridge: assets.mozart
            }, this.onLoadComplete.bind(this))


            // // BIND ==> garder le scope de l'Experience Manager
            // loaderManager.loadGLTF(assets.mozart, this.setupIntro.bind(this))

        },

        onLoadComplete(){
            this.setupIntro(loaderManager.loadedAssets.mozart);
        },

        setupIntro(gltf){

            router.showScreen(1)
            gltf.scene.scale.set(0.4, 0.4, 0.4);
            gltf.scene.position.set(0, -0.8, -5);
            gltf.scene.rotation.set(Math.PI / 8, - Math.PI * 1.6, 0);
            gltf.transparent = true;
            gltf.castShadow = true;
            sceneManager.addObject(gltf.scene);
            this.objects.statue = gltf.scene;
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



        fillScene(index)
        {

            switch (index)
            {
                case 0:

                    break;
                case 1:

                    const directionalLight = new THREE.DirectionalLight(0xfffffff, 2)
                    directionalLight.position.set(-2, 2, 1)
                    directionalLight.castShadow = true
                    sceneManager.addObject(directionalLight)

                    const lightAxisHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
                    sceneManager.addObject(lightAxisHelper)

                    break;

                case 2:
                    // ÉCRAN SCÈNE 3D ACTE 2
                    console.log('acte 2')
                    console.log(sceneManager.getThreeScene())


                    const moveToAct3 = () =>
                    {
                        sceneManager.removeObject(this.objects.statue)
                        setTimeout(() =>
                        {
                            router.showScreen(3);
                        }, 3000)
                    }

                    moveToAct3()

                    // gsap.to(this.objects.statue.material, {
                    //     opacity: 0,
                    //     onComplete: moveToAct3
                    // })



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
                sceneManager.getCamera().update();

                // Start the bridge loop
                bridgeScene.bridgeLoop();

                // Render
                renderer.draw(sceneManager);

                // Call tick again on the next frame
                window.requestAnimationFrame(this.tick);
            }

            this.tick();
        }
    }

export default experienceManager;