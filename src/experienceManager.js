import * as THREE from "three";
import signal from "signal-js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {ObjectControls} from "threejs-object-controls";

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
import pointerManager from "./pointerManager";

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
        currentObject : null,
        init()
        {
            // Scene
            sceneManager.create(canvas);

            this.textures = loaderManager.loadTextures();
            // bridgeScene.init();



            // Renderer
            renderer.init(canvas);

            signal.on('changeScreen', this.onChangeScreen)



            // Tick loop
            this.startLoopExperience();


            loaderManager.loadMultipleGLTFs({
                statue: assets.statue.url,
                bridge: assets.bridge.url,
                harpsichord: assets.harpsichord.url,
                parchemin: assets.parchemin.url,
                flask: assets.flask.url,
            }, this.onLoadComplete.bind(this));


            // // BIND ==> garder le scope de l'Experience Manager
            // loaderManager.loadGLTF(assets.mozart, this.setupIntro.bind(this))
            this.addLight();
        },

        addLight() {
            const light = new THREE.AmbientLight(0x404040); // soft white light
            // sceneManager.addObject(light);
        },

        onLoadComplete(){
            this.objects = loaderManager.loadedAssets;
            this.placeObjects();
            router.showScreen(1);

            // Pointer manager, for turning meshes feature
            pointerManager.init();


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
                    console.log('PASSÉ PAR 0')
                    break;
                case 1:

                    this.currentIndex = 1;

                    this.directionalLight = new THREE.DirectionalLight(0xfffffff, 0.7);
                    this.directionalLight.position.set(-2, 2, 1);

                    this.directionalLight.shadow.mapSize.width = 2048
                    this.directionalLight.shadow.mapSize.height = 2048
                    this.directionalLight.shadow.camera.far = 15;
                    console.log('bias')
                    console.log(this.directionalLight.shadow.bias)
                    // this.directionalLight.shadow.bias = 0.01

                    //
                    // this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight)
                    // sceneManager.addObject(this.directionalLightHelper);


                    this.ambientLight = new THREE.AmbientLight('#B9B9B9', 1);
                    sceneManager.addObject(this.ambientLight);


                    // this.directionalLight.castShadow = true
                    sceneManager.addObject(this.directionalLight);

                    // const lightAxisHelper = new THREE.DirectionalLightHelper(this.directionalLight, 0.5);
                    // sceneManager.addObject(lightAxisHelper)
                    this.changeFocusedObject(this.objects.statue, true);

                    break;

                case 2:
                    // ÉCRAN SCÈNE 3D ACTE 2
                    console.log('acte 2')
                    this.removeFocusedObject();
                    sceneManager.removeObject(this.directionalLight)
                    break;
                
                case 3:
                    this.removeFocusedObject();
                    sceneManager.removeObject(this.directionalLight)
                    sceneManager.removeObject(this.ambientLight);
                    break;

                case 4:
                    this.currentIndex = 4;
                    this.changeFocusedObject(this.objects.statue, true);

                    this.directionalLight.castShadow = true;
                    this.objects.statue.castShadow = true;
                    this.objects.bridge.castShadow = true;
                    this.objects.bridge.receiveShadow = true;
                    this.objects.bridge.children[0].castShadow = true;
                    this.objects.bridge.children[0].receiveShadow = true;

                    // this.objects.bridge.children[0].children[0].castShadow = true;
                    // this.objects.bridge.children[0].children[0].receiveShadow = true;
                    //
                    // this.objects.bridge.children[0].children[1].castShadow = true;
                    // this.objects.bridge.children[0].children[1].receiveShadow = true;
                    //
                    // this.objects.bridge.children[0].children[2].castShadow = true;
                    // this.objects.bridge.children[0].children[2].receiveShadow = true;
                    //
                    // this.objects.bridge.children[0].children[3].castShadow = true;
                    // this.objects.bridge.children[0].children[3].receiveShadow = true;
                    //
                    // this.objects.bridge.children[0].children[4].castShadow = true;
                    // this.objects.bridge.children[0].children[4].receiveShadow = true;
                    //
                    // this.objects.bridge.children[0].children[5].castShadow = true;
                    // this.objects.bridge.children[0].children[5].receiveShadow = true;

                    for (let i = 0; i < this.objects.bridge.children[0].children.length; i++)
                    {
                        console.log('ça fonctionne')
                        this.objects.bridge.children[0].children[i].castShadow = true;
                        this.objects.bridge.children[0].children[i].receiveShadow = true;
                        // this.objects.bridge.children[0].children[i].material =  new THREE.MeshNormalMaterial()
                    }



                    console.log('shadows')
                    console.log(this.objects.bridge)


                    bridgeScene.init();
                    bridgeScene.startAnimation();
                    bridgeScene.addActBridgeObject();
                    break;
                case 5:
                    this.changeFocusedObject(this.objects.harpsichord, true, true);
                    break;
                case 6:
                    this.changeFocusedObject(this.objects.parchemin, true, true);
                    console.log('childs:')
                    const glassMaterial = new THREE.MeshPhysicalMaterial({
                        opacity: 0,
                        transparent: true,
                    });
                    const parcheminMaterial = new THREE.MeshPhysicalMaterial({
                        reflectivity: 0.5,
                        roughness: 1,
                        metalness: 0,
                        transmission: 0,
                    });
                    const physicalMaterial = new THREE.MeshPhysicalMaterial();
                    this.objects.parchemin.children.forEach((child) =>
                    {
                        if (child.name === "Glass")
                        {
                            child.material = glassMaterial;
                        } else if (child.name === "Parchemin") {
                            child.material = parcheminMaterial;
                            console.log(child)

                        }
                        else
                        {
                            child.material = physicalMaterial;
                        }


                    })
                    // this.currentObject.
                    break;
                case 7:
                    this.changeFocusedObject(this.objects.flask, true, true);
                    break;
                case 8:
                    this.removeFocusedObject();
                    break;
                default:
            }

        },
        removeFocusedObject(callback) {
            if (this.currentObject) {
                console.log('J\'ENLÈVE L\'OBJET:');
                console.log(this.currentObject);
                sceneManager.removeObject(this.currentObject);
                this.currentObject = null;
                callback;
            }
        },
        removeDisappearingObject(callback){
            sceneManager.removeObject(this.objectToDisappear);
            this.objectToDisappear = null;
            callback();
        },
        changeFocusedObject(object, animate = false, disparition = false) {

            if (disparition)
            {
                switch (this.currentObject) {
                    case this.objects.statue:
                        console.log('disparaitre la statue')
                        this.objectToDisappear = this.currentObject;
                        gsap.to(this.currentObject.position, {
                            x:0,
                            y: 5,
                            z: -2.660,
                            duration: 1,
                            onComplete: onCompleteDisparition.bind(this)
                        })
                        break;
                    case this.objects.harpsichord:
                        this.objectToDisappear = this.currentObject;
                        console.log('disparaitre le harpsichord')
                        gsap.to(this.currentObject.position, {
                            x:0.360,
                            y: 4,
                            z: -2.360,
                            duration: 1,
                            onComplete: onCompleteDisparition.bind(this)
                        });
                        break;
                    case this.objects.parchemin:
                        console.log('disparaitre parchemin')
                        this.objectToDisappear = this.currentObject;
                        gsap.to(this.currentObject.position, {
                            x:0,
                            y: 4,
                            z: -1.800,
                            duration: 1,
                            onComplete: onCompleteDisparition.bind(this)
                        });
                        break;
                    case this.objects.bottle:
                        console.log('disparaitre bouteilles')
                        this.objectToDisappear = this.currentObject;
                        gsap.to(this.currentObject.position, {
                            x: 0,
                            y: 4,
                            z: -2,
                            duration: 1,
                            onComplete: onCompleteDisparition.bind(this)
                        });
                        break;
                }
            }
            // Enlève l'object courant s'il existe
            function onCompleteDisparition () {
                this.removeDisappearingObject(() =>
                {
                    // Ajoute l'objet dans la scene
                    this.currentObject = object;
                    sceneManager.addObject(this.currentObject);

                    console.log('je suis bien arrivé à la condition animate')

                    if (animate) {
                        switch (this.currentObject) {
                            case this.objects.statue:
                                console.log('PLACER LA STATUE')
                                this.currentObject.position.y = 4;
                                gsap.to(this.currentObject.position, {
                                    x:0,
                                    y: -0.330,
                                    z: -2.660,
                                    duration: 1
                                })
                                break;
                            case this.objects.harpsichord:
                                console.log('PLACER LE HARPSICHORD')
                                this.currentObject.position.y = 4;
                                gsap.to(this.currentObject.position, {
                                    x:  0.360,
                                    y: -0.580,
                                    z: -2.360,
                                    duration: 1
                                });
                                break;
                            case this.objects.parchemin:
                                console.log('PLACER Le parchemiun')

                                this.currentObject.position.y = 4;
                                gsap.to(this.currentObject.position, {
                                    x:0,
                                    y: -0.460,
                                    z: -1.800,
                                    duration: 1
                                });
                                break;
                            case this.objects.bottle:
                                console.log('PLACER LA bouteille')

                                this.currentObject.position.y = 4;
                                gsap.to(this.currentObject.position, {
                                    x:0,
                                    y: -0.5,
                                    z: -2,
                                    duration: 1
                                });
                                break;
                        }

                    }
                });

            }
            if (this.currentIndex === 1 || this.currentIndex === 4)
            {
                this.currentObject = object;
                sceneManager.addObject(this.currentObject);

                console.log('index 1')
                this.currentObject.position.y = 4;
                console.log('PLACER STATUE INDEX 1')
                gsap.to(this.currentObject.position, {
                    x:0,
                    y: -0.330,
                    z: -2.660,
                    duration: 1
                })
                this.currentIndex = null;
            }

            //Animation de disparition
            // if (disparition)
            // {
            //     console.log('sensé disparaitre là')
            //     gsap.to(object.position, {
            //         y: 4,
            //         delay: 0.5,
            //         duration: 1,
            //         onComplete: completedAnimation.bind(this),
            //     })
            //     console.log('gsap animation disparition sur :')
            //     console.log(object)
            //
            // } else if (this.currentIndex === 1)
            // {
            //     console.log('NOW, THIS IS ANIMATE COMPLETE')
            //     console.log(object)
            //     this.currentObject = object;
            //     sceneManager.addObject(this.currentObject);
            //
            //         object.scale.set(0.250, 0.250, 0.250)
            //         object.position.set(0, -0.330, -2.660);
            // }
            //
            // function completedAnimation() {
            //     // Ajoute l'objet dans la scene
            //     this.currentObject = object;
            //         if (object === this.objects.statue)
            //         {
            //             // this.objects.statue.position.set(0, -0.330, -2.660)
            //             object.rotation.set(0.170, - 1.6 * Math.PI, 0)
            //             object.scale.set(0.250, 0.250, 0.250)
            //             object.position.set(0, 4, -3);
            //             sceneManager.addObject(this.currentObject);
            //             gsap.to(object.position, {
            //                 x:0,
            //                 y: -0.330,
            //                 z: -2.660,
            //                 duration: 1
            //             })
            //         } else
            //         if (object === this.objects.harpsichord)
            //         {
            //             console.log('HARPSICHORD NOW')
            //             // object.position.set(0.360, 4, -2.360);
            //             // object.rotation.set(-3.002, -0.908, -3.101);
            //             // object.scale.set(1, 1, 1);
            //             gsap.to(object.position, {
            //                 y: -0.580,
            //                 delay: 0.5,
            //                 duration: 1
            //             })
            //         }
            //
            //     }

            //
            // if (animateStart && this.currentIndex === 1)
            // {
            //     this.currentObject = object;
            //     sceneManager.addObject(this.currentObject);
            //
            //     object.scale.set(0.250, 0.250, 0.250)
            //     object.position.set(0, -0.330, -2.660);
            // }


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
                // sceneManager.getCamera().update();


                // Start the bridge loop
                if (router.getCurrentScene() === 4 ||
                    router.getCurrentScene() === 5 ||
                    router.getCurrentScene() === 6 ||
                    router.getCurrentScene() === 7
                )
                {
                    bridgeScene.bridgeLoop();
                }

                this.onUpdate();

                // Render
                renderer.draw(sceneManager);

                // Call tick again on the next frame
                window.requestAnimationFrame(this.tick);
            }

            this.tick();
        },

        onUpdate() {
            // Auto rotate current object
            if (this.currentObject) {
                this.currentObject.rotation.y += 0.001;
            }
        }
    }

export default experienceManager;