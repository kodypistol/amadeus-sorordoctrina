import * as THREE from 'three';
import gsap from "gsap";

import sceneManager from "../scene";
import renderer from "../renderer";
import Camera from '../Camera';
import experienceManager from "../experienceManager";

const bridgeScene = {
    init()
    {
        const brickTexture = experienceManager.textures[0];
        const brickNormalTexture = experienceManager.textures[1];
        let clone1, clone2;

        experienceManager.directionalLight.intensity = 1;
        sceneManager.addObject(experienceManager.directionalLight);

        // this.bridgeGroup = new THREE.Group();
        //
        // this.bridge1 = experienceManager.objects.bridge.scene
        // this.bridge1.position.y = 1
        // this.bridgeGroup.add(this.bridge1)
        //
        // this.bridge2 = experienceManager.objects.bridge.scene
        // this.bridge2.position.y = 2
        // this.bridgeGroup.add(this.bridge2)
        //
        // this.bridge3 = experienceManager.objects.bridge.scene
        // this.bridge3.position.y = 3
        // this.bridgeGroup.add(this.bridge3)
        //
        //
        // sceneManager.addObject(this.bridgeGroup)

        this.bridgeGroup1 = new THREE.Group();
        this.bridgeGroup1.add(experienceManager.objects.bridge);

        clone1 = experienceManager.objects.bridge.clone();
        clone1.position.z = -3.350;
        clone2 = experienceManager.objects.bridge.clone();
        clone2.position.z = -5.335;

        this.bridgeGroup1.add(clone1);
        this.bridgeGroup1.add(clone2);

        sceneManager.addObject(this.bridgeGroup1)

        this.bridgeGroup1.position.y = 0;

        this.bridgeGroup2 = this.bridgeGroup1.clone()
        this.bridgeGroup2.position.z = -5.955;
        sceneManager.addObject(this.bridgeGroup2)


    },

    startAnimation()
    {

        // gsap.to(this.rectangle1.material,
        //     {
        //         opacity: 1
        //     })
        // gsap.to(this.rectangle2.material,
        //     {
        //         opacity: 1
        //     })
    },
    addAct1Object()
    {
        this.act1Object = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1, 5, 5),
            new THREE.MeshStandardMaterial({
                color: 'green',
                name: 'Act1Object'
            })
        )
        this.act1Object.position.set(0, 0, -4)
        this.act1Object.rotation.set(0, Math.PI / 8 , 0)
        sceneManager.addObject(this.act1Object)
    },
    bridgeLoop()
    {
        this.bridgeGroup1.position.z = this.bridgeGroup1.position.z + 0.01
        this.bridgeGroup2.position.z = this.bridgeGroup2.position.z + 0.01

        if(this.bridgeGroup1.position.z > 5.520)
        {
            this.bridgeGroup1.position.z = -6.375
        }
        if (this.bridgeGroup2.position.z > 5.520)
        {
            this.bridgeGroup2.position.z = -6.390
        }
    }
}

export default bridgeScene;