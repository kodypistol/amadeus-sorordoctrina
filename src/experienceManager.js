import * as THREE from "three";
import signal from "signal-js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";

import sceneManager from "./scene";
import renderer from "./renderer";
import loaderManager from './loaderManager'
import assets from './assets'
import bridgeScene from './acts/act1-bridgeScene'
import Camera from "./Camera";
import audioManager from "./audioManager";
import bridgeLoop from "./archives/BridgeLoop";
import router from "./router";

const canvas = document.querySelector("canvas.webgl");

const experienceManager =
    {
        objects: {
            statue: null,
            bridge: null,
            clavecin: null,
            parchemin: null,
            bottle: null
        },

        init()
        {
            // Scene
            sceneManager.create(canvas);

            this.textures = loaderManager.loadTextures();
            // bridgeScene.init();

            // Renderer
            renderer.init(canvas);

            // Tick loop
            this.startLoopExperience(2);

            signal.on('changeScreen', this.onChangeScreen)

            loaderManager.loadMultipleGLTFs({
                statue: assets.statue.url,
                bridge: assets.bridge.url,
                harpsichord: assets.harpsichord.url,
                parchment: assets.parchment.url,
                flask: assets.flask.url,
            }, this.onLoadComplete.bind(this));


            // // BIND ==> garder le scope de l'Experience Manager
            // loaderManager.loadGLTF(assets.mozart, this.setupIntro.bind(this))

        },

        onLoadComplete(){
            this.objects = loaderManager.loadedAssets;
            this.placeObjects();
            router.showScreen(1)
        },

        placeObjects() {
            const objectToBePlaced = ['statue', 'bridge'];
            objectToBePlaced.forEach((objectName) => {
                this.placeMesh(this.objects[objectName], assets[objectName]);
            });
        },

        placeMesh(mesh, data) {
            mesh.position.set(data.pX, data.pY, data.pZ);
            mesh.rotation.set(data.rX, data.rY, data.rZ);
            mesh.scale.set(data.sX, data.sY, data.sZ);
        },

        // setupIntro(gltf, assetsAttributes, objectName){


        //     console.log('Object name : ', objectName)
        //     this.objects[objectName] = gltf
        //     //this.objects.bridge = loaderManager.loadedAssets.bridge;

        //     switch (objectName) {
        //         case 'mozart':
        //             console.log('SWITCH CASE MOZART')
        //             this.objects['mozart'].scene.position.set(assets['mozart'].pX, assets['mozart'].pY, assets['mozart'].pZ)
        //             this.objects['mozart'].scene.rotation.set(assets['mozart'].rX, assets['mozart'].rY, assets['mozart'].rZ)
        //             this.objects['mozart'].scene.scale.set(assets['mozart'].sX, assets['mozart'].sY, assets['mozart'].sZ)
        //             break;

        //         case 'bridge1':
        //             console.log('SWITCH CASE BRIDGE')
        //             this.objects['bridge1'].scene.position.set(assets['bridge1'].pX, assets['bridge1'].pY, assets['bridge1'].pZ)
        //             this.objects['bridge1'].scene.rotation.set(assets['bridge1'].rX, assets['bridge1'].rY, assets['bridge1'].rZ)
        //             this.objects['bridge1'].scene.scale.set(assets['bridge1'].sX, assets['bridge1'].sY, assets['bridge1'].sZ)

        //             break;
        //         case 'bridge2':
        //             this.objects['bridge2'].scene.position.set(assets['bridge2'].pX, assets['bridge2'].pY, assets['bridge2'].pZ)
        //             this.objects['bridge2'].scene.rotation.set(assets['bridge2'].rX, assets['bridge2'].rY, assets['bridge2'].rZ)
        //             this.objects['bridge2'].scene.scale.set(assets['bridge2'].sX, assets['bridge2'].sY, assets['bridge2'].sZ)
        //             break;
        //         case 'bridge3':
        //             this.objects['bridge3'].scene.position.set(assets['bridge3'].pX, assets['bridge3'].pY, assets['bridge3'].pZ)
        //             this.objects['bridge3'].scene.rotation.set(assets['bridge3'].rX, assets['bridge3'].rY, assets['bridge3'].rZ)
        //             this.objects['bridge3'].scene.scale.set(assets['bridge3'].sX, assets['bridge3'].sY, assets['bridge3'].sZ)
        //             break;
        //         default:
        //     }
        //     // this.objects[objectName].scene.position.set(assetsAttributes.pX, assetsAttributes.pY, assetsAttributes.pZ)
        //     // this.objects[objectName].scene.rotation.set(assetsAttributes.rX, assetsAttributes.rY, assetsAttributes.rZ)
        //     // this.objects[objectName].scene.scale.set(assetsAttributes.sX, assetsAttributes.sY, assetsAttributes.sZ)
        //     //
        //     // sceneManager.addObject(this.objects[objectName].scene);
        // },

        onChangeScreen(index)
        {

            console.log(`go to screen ${index} in three js scene`);
            experienceManager.fillScene(index);

            switch(index)
            {
                case 0:
                    canvas.style.display = 'none';
                    break;
                case 1:
                    canvas.style.display = 'block';
                    break;
                case 4:
                    audioManager.chooseSong();
                    break;
            }
        },



        fillScene(index)
        {

            this.currentObject = this.objects.harpsichord;

            switch (index)
            {
                case 0:

                    break;
                case 1:

                    this.directionalLight = new THREE.DirectionalLight(0xfffffff, 1)
                    this.directionalLight.position.set(-2, 2, 1)
                    this.directionalLight.castShadow = true
                    sceneManager.addObject(this.directionalLight)

                    // const lightAxisHelper = new THREE.DirectionalLightHelper(this.directionalLight, 0.5);
                    // sceneManager.addObject(lightAxisHelper)
                    sceneManager.addObject(this.objects.statue)
                    break;

                case 2:
                    // ÉCRAN SCÈNE 3D ACTE 2
                    console.log('acte 2')
                    sceneManager.removeObject(this.objects.statue)
                    sceneManager.removeObject(this.directionalLight)
                    break;

                case 3:
                    sceneManager.removeObject(this.objects.statue)
                    sceneManager.removeObject(this.directionalLight)
                    break;

                case 4:
                    bridgeScene.init();
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
                if (router.getCurrentScene() === 4)
                {
                    bridgeScene.bridgeLoop();
                }

                // Render
                renderer.draw(sceneManager);

                // Call tick again on the next frame
                window.requestAnimationFrame(this.tick);
            }

            this.tick();
        }
    }

export default experienceManager;
