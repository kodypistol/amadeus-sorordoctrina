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
                parchemin: assets.parchemin.url,
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
            const objectToBePlaced = ['statue', 'bridge', 'harpsichord', 'flask', 'parchemin'];
            objectToBePlaced.forEach((objectName) => {
                this.placeMesh(this.objects[objectName], assets[objectName]);
            });
        },

        placeMesh(mesh, data) {
            mesh.position.set(data.pX, data.pY, data.pZ);
            mesh.rotation.set(data.rX, data.rY, data.rZ);
            mesh.scale.set(data.sX, data.sY, data.sZ);
        },

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

            // this.currentObject = this.objects.harpsichord;

            switch (index)
            {
                case 0:

                    break;
                case 1:

                    this.directionalLight = new THREE.DirectionalLight(0xfffffff, 1)
                    this.directionalLight.position.set(-2, 2, 1)
                    // this.directionalLight.castShadow = true
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
                    sceneManager.addObject(this.objects.statue)
                    this.objects.statue.position.set(0, -0.330, -2.660)
                    this.objects.statue.rotation.set(0.170, - 1.6 * Math.PI, 0)
                    this.objects.statue.scale.set(0.250, 0.250, 0.250)
                    bridgeScene.init();
                    bridgeScene.startAnimation();
                    bridgeScene.addActBridgeObject();
                    break;
                case 5:
                    sceneManager.removeObject(this.objects.statue)

                    sceneManager.addObject(this.objects.harpsichord)
                    break;
                case 6:
                    sceneManager.removeObject(this.objects.harpsichord)
                    sceneManager.addObject(this.objects.parchemin)
                    break;
                case 7:
                    sceneManager.removeObject(this.objects.parchemin)
                    sceneManager.addObject(this.objects.flask)
                    break;
                case 8:
                    sceneManager.removeObject(this.objects.flask)
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
                if (router.getCurrentScene() === 4 ||
                    router.getCurrentScene() === 5 ||
                    router.getCurrentScene() === 6
                )
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
